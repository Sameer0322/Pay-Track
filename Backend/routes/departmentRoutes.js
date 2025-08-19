const express = require('express');
const router = express.Router();
const {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  getDepartmentsNames,
  getEmployeeCountByDepartment,
} = require('../controllers/departmentController');

const { protect, restrictTo } = require('../middlewares/authMiddleware');

router.use(protect);
router.use(restrictTo('employer'));

router.route('/')
  .post(createDepartment)
  .get(getDepartments);

router.route('/:id')
  .put(updateDepartment)
  .delete(deleteDepartment);

router.route('/names')
  .get(getDepartmentsNames);

router.route('/employee-count/:departmentName')
  .get(getEmployeeCountByDepartment);

module.exports = router;
