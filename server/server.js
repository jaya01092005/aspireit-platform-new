const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Simple user data
const users = [
  { id: 1, username: 'user1', password: 'password1', email: 'user1@example.com', bio: 'Hello, I am user1' },
  { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com', bio: 'Hello, I am user2' },
];

// Secret key for JWT
const SECRET_KEY = 'your_secret_key';

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Profile endpoint
app.get('/profile', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (user) {
    res.json({ username: user.username, email: user.email, bio: user.bio });
  } else {
    res.sendStatus(404);
  }
});

app.put('/profile', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (user) {
    const { email, bio } = req.body;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    res.json({ message: 'Profile updated successfully', user });
  } else {
    res.sendStatus(404);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
