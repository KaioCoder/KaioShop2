const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const users = []; // Temporary user store

app.use(cors());
app.use(express.json());

// Signup route
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashedPassword });
  res.json({ message: 'Signup successful' });
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: 'User not found' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Incorrect password' });

  res.json({ message: 'Login successful', username: user.username });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
