const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(cors());

// Routes

// Register and login routes
app.use('/auth', require('./routes/auth'));

// Users routes
app.use('/users', require('./routes/users'));

// Posts routes
app.use('/posts', require('./routes/posts'));

app.listen(3001, () => {
  console.log('Server is running on port 3001');
})