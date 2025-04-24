const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory user store (mock database)
const users = [];

// Signup route
app.post('/api/signup', (req, res) => {
  const { email, password, username } = req.body;
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }
  users.push({ email, password, username });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Forgot password mock
app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (user) {
    res.json({ message: 'Password reset link sent (mock)' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
