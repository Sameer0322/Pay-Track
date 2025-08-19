const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getEmployeeCounts,
  getPendingApprovals
} = require('../controllers/employeeController');

const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.use(protect);
router.use(restrictTo('employer'));

router.route('/')
  .post(createEmployee)
  .get(getEmployees);

// Dashboard routes
router.get('/dashboard/counts', getEmployeeCounts);
router.get('/dashboard/pending-approvals', getPendingApprovals);

router.route('/:id')
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
