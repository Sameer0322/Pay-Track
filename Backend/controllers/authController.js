const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Register (Employer only)
exports.registerEmployer = async (req, res) => {
  try {
    const { name, email, password, organization } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'MISSING_FIELDS',
        message: 'Name, email, and password are required'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: 'EMAIL_EXISTS',
        message: 'Email already exists' 
      });
    }

    // Find the highest employerId so far and increment
    const lastEmployer = await User.findOne({ role: 'employer' })
    .sort({ employerId: -1 })
    .collation({ locale: 'en', numericOrdering: true })
    .exec();

    let newEmployerId = 1;
    if (lastEmployer && lastEmployer.employerId) {
      const lastIdNum = parseInt(lastEmployer.employerId, 10);
      if (!isNaN(lastIdNum)) newEmployerId = lastIdNum + 1;
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'employer',
      organization,
      employerId: newEmployerId.toString(),
    });

    const token = generateToken(user);
    res.status(201).json({ 
      success: true,
      token, 
      user: { 
        id: user._id,
        name: user.name, 
        email: user.email,
        role: user.role,
        employerId: user.employerId,
        employeeId: user.employeeId,
        organization: user.organization, 
      } 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login (Employer or Employee)
exports.login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      
      // Validate role
      if (!role) {
        return res.status(400).json({ 
          success: false,
          error: 'MISSING_ROLE',
          message: 'Please select a role (employer or employee)'
        });
      }

      // Validate role type
      if (!['employer', 'employee'].includes(role)) {
        return res.status(400).json({
          success: false,
          error: 'INVALID_ROLE',
          message: 'Invalid role specified. Must be either employer or employee'
        });
      }
  
      // Validate required fields
      if (!email) {
        return res.status(400).json({
          success: false,
          error: 'MISSING_EMAIL',
          message: 'Email is required for login'
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          error: 'MISSING_PASSWORD',
          message: 'Password is required'
        });
      }
  
      // Find user based on role and email
      const user = await User.findOne({ email, role });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'USER_NOT_FOUND',
          message: 'No account found with the provided credentials'
        });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          error: 'INVALID_PASSWORD',
          message: 'The password you entered is incorrect'
        });
      }
  
      const token = generateToken(user);
      console.log('Login successful, generated token');
      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
          email: user.email,
          employerId: user.employerId,
          employeeId: user.employeeId,
          organization: user.organization,
        },
      });
      
      // console.log('User:', user);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Logout
exports.logout = async (req, res) => {
    try {
      res.status(200).json({ message: 'Logout successful. Token cleared on client.' });
    } catch (error) {
      res.status(500).json({ message: 'Logout failed', error: error.message });
    }
};