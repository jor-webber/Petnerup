const router = require('express').Router();
const pool = require('../db');
const authorization = require('../middleware/authorization');

router.get('/', async (req, res) => {
  try {
    const posts = await pool.query('SELECT image, content, posted_time, first_name, last_name FROM posts JOIN users ON posts.poster_id = users.id');
    console.log(posts.rows);
    res.json(posts.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;