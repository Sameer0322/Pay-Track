const express = require('express');
const router = express.Router();
const { registerEmployer, login, logout } = require('../controllers/authController');

// Employer registers via email
router.post('/register', registerEmployer);

// Login (employer or employee)
router.post('/login', login);

// Logout
router.post('/logout', logout);

module.exports = router;
