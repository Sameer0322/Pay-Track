const express = require('express');
const router = express.Router();

const { createSalary, 
        getSalaries, 
        updateSalary, 
        confirmSalaryReceipt, 
        deleteSalary } = require('../controllers/salaryController');

const { protect, restrictTo } = require('../middlewares/authMiddleware');

// Create salary - Employer only
router.post(
  '/',
  protect,
  restrictTo('employer'),
  createSalary
);

// Get salaries - both Employer & Employee
router.get(
  '/',
  protect,
  getSalaries
);

// Update salary - Employer only
router.put(
  '/:id',
  protect,
  restrictTo('employer'),
  updateSalary
);

// Confirm salary receipt - Employee only
router.post(
  '/confirm/:id',
  protect,
  restrictTo('employee'),
  confirmSalaryReceipt
);

// Delete salary - Employer only
router.delete(
  '/:id',
  protect,
  restrictTo('employer'),
  deleteSalary
);

module.exports = router;
