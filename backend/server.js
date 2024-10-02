const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ProjectPilot', { useNewUrlParser: true, useUnifiedTopology: true });

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String // 'admin' or 'employee'
});

const User = mongoose.model('User', userSchema);

// Signup route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, 'secret_key');
    return res.json({ token, role: user.role });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});


// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id, role: user.role }, 'secretKey', { expiresIn: '1h' });
  res.json({ token, role: user.role });
});

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).send("Access denied");

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");

    req.user = decoded;
    next();
  });
};

// Admin dashboard route
app.get('/admin/dashboard', authMiddleware, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send("Access forbidden");
  res.send("Welcome to the Admin Dashboard");
});

// Employee home route
app.get('/home', authMiddleware, (req, res) => {
  if (req.user.role !== 'employee') return res.status(403).send("Access forbidden");
  res.send("Welcome to the Home Page");
});

// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
