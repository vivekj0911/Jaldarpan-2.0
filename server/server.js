const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // To use .env file

const app = express();

// Configuration
const SECRET_KEY = process.env.SECRET_KEY || 'your_very_secret_and_complex_key_here';
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Utility functions
const usersFilePath = path.join(__dirname, 'users.json');

async function readUsersFile() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []; // Return an empty array if file doesn't exist
    }
    throw err;
  }
}

async function writeUsersFile(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

// Validation functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

// Signup Endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { employee_id, role, location, email, password, phone } = req.body;

    // Validate input
    if (!employee_id || !role || !location || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters, include one uppercase letter, one lowercase letter, and one number.',
      });
    }

    // Check for existing user
    const users = await readUsersFile();
    const existingUser = users.find(user => user.email === email || user.phone === phone || user.employee_id === employee_id);

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      employee_id,
      role,
      location,
      email,
      phone,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    await writeUsersFile(users);

    // Generate JWT
    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, SECRET_KEY, { expiresIn: '24h' });

    res.status(201).json({ message: 'User registered successfully.', token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const users = await readUsersFile();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '24h' });

    res.status(200).json({ message: 'Login successful.', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
