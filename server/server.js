const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple user data
const users = [
  { id: 1, username: 'user1', password: 'password1', email: 'user1@example.com', bio: 'Hello, I am user1', profilePic: '' },
  { id: 2, username: 'user2', password: 'password2', email: 'user2@example.com', bio: 'Hello, I am user2', profilePic: '' },
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

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Received login request:', { username, password });
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    console.log('User authenticated, sending token');
    return res.json({ token });
  } else {
    console.log('Invalid credentials');
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Profile endpoint
app.get('/profile', authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (user) {
    res.json({ username: user.username, email: user.email, bio: user.bio, profilePic: user.profilePic });
  } else {
    res.sendStatus(404);
  }
});

app.put('/profile', authenticateToken, upload.single('profilePic'), (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (user) {
    const { email, bio } = req.body;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    if (req.file) {
      user.profilePic = `/uploads/${req.file.filename}`;
    }
    res.json({ message: 'Profile updated successfully', user });
  } else {
    res.sendStatus(404);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
