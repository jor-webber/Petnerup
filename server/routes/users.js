const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');
const User = require('../models/User');

router.get('/', authorization, async(req, res) => {
  try {
    const allUsers = [];
    const users = await pool.query('SELECT * FROM users');
    users.rows.forEach(user => { allUsers.push(new User(user.id, user.first_name, user.last_name, user.date_of_birth, user.email)) });
    res.json(allUsers);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', authorization, async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    res.json({
      firstName: users.rows[0].first_name,
      lastName: users.rows[0].last_name,
      email: users.rows[0].email,
      dateOfBirth: users.rows[0].date_of_birth,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;