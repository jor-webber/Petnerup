const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');

// Registering
router.post('/register', validInfo, async (req, res) => {
  try {
    // destructure req.body
    const { firstName, lastName, dateOfBirth, email, password } = req.body;
    console.log(req.body);

    // check if email and password are valid
    if (!email || !password || !dateOfBirth || !firstName || !lastName) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // check if email is already in use
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json({ msg: 'Email is already in use' });
    }

    // Bcrypt password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    // Enter user inside db
    const newUser = await pool.query(
      'INSERT INTO users (first_name, last_name, date_of_birth, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [firstName, lastName, dateOfBirth, email, bcryptPassword]
    );

    // generate our jwt token
    const token = jwtGenerator(newUser.rows[0].id);

    res.json({
      token,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

// Login route
router.post('/login', validInfo, async (req, res) => {
  try {
    // destructure req.body
    const { email, password } = req.body;

    // check if email and password are valid
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // check if email is already in use (if not throw error)
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ msg: 'Email is not registered' });
    }

    // check if password is correct (if not throw error)
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json({ msg: 'Password or email is incorrect' });
    }

    // generate our jwt token
    const token = jwtGenerator(user.rows[0].id);

    res.json({ 
      token,
      user: {
        id: user.rows[0].id,
        firstName: user.rows[0].first_name,
        lastName: user.rows[0].last_name,
        email: user.rows[0].email,
      } 
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

router.get('/is-verified', authorization, async (req, res) => {
  try {
    res.json({ authorized: true });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
