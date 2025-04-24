
// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = []; // In-memory storage for demo

// Signup route
app.post("/signup", (req, res) => {
  const { email, password, username } = req.body;
  const userExists = users.find(user => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: "Email already registered!" });
  }

  users.push({ email, password, username });
  res.status(200).json({ message: "Signup successful!" });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({ message: "Login successful!" });
  } else {
    res.status(401).json({ message: "Invalid email or password." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
