const User = require('../models/User');

// @desc Create an employee under current employer
exports.createEmployee = async (req, res) => {
  console.log('--- Incoming createEmployee request ---');
  console.log('req.body:', req.body);
  console.log('req.user:', req.user);
  try {
    const { name, email, department, designation, salary, joiningDate, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required for employee' });
    }

    const plainPassword = password;

    // Generate composite employeeId (employerId-employeeNumber) per employer
    const lastEmployee = await User.findOne({ employerId: req.user.employerId, role: 'employee' })
      .sort({ employeeId: -1 })
      .collation({ locale: 'en', numericOrdering: true })
      .exec();
    let newIdNum = 1;
    if (lastEmployee && lastEmployee.employeeId) {
      const lastParts = lastEmployee.employeeId.split('-');
      const numPart = parseInt(lastParts[1], 10);
      if (!isNaN(numPart)) newIdNum = numPart + 1;
    }
    const compositeEmployeeId = `${req.user.employerId}-${newIdNum}`;

    const newEmployee = await User.create({
      name,
      email,
      employeeId: compositeEmployeeId,
      employerId: req.user.employerId,
      department,
      designation,
      salary,
      joiningDate,
      password: plainPassword,
      role: 'employee',
      employer: req.user._id,
    });

    res.status(201).json({
      _id: newEmployee._id,
      name: newEmployee.name,
      email: newEmployee.email,
      employeeId: newEmployee.employeeId,
      employerId: newEmployee.employerId,      
      department: newEmployee.department,
      designation: newEmployee.designation,
      salary: newEmployee.salary,
      joiningDate: newEmployee.joiningDate,
      password: plainPassword,
    });   
  } catch (error) {
    console.error('Error in createEmployee:', error);
    // Check for duplicate email error
    if (error.code === 11000 && error.keyValue.email) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    res.status(500).json({ message: 'Failed to create employee', error: error.message });
  }
};

// @desc Get all employees for the logged-in employer
exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({
      employer: req.user._id,
      role: 'employee',
    }).populate('department', 'name');

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get employees', error: error.message });
  }
};

// @desc Update employee (employer scope)
exports.updateEmployee = async (req, res) => {
  try {
    const employee = await User.findOne({
      _id: req.params.id,
      employer: req.user._id,
      role: 'employee',
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    // Prevent password update by employer
    if('password' in req.body) {
      delete req.body.password;
    }

    Object.assign(employee, req.body);
    const updated = await employee.save();

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update employee', error: error.message });
  }
};

// @desc Get employee counts for dashboard
// @route GET /api/employees/dashboard/counts
// @access Private (Employer)
exports.getEmployeeCounts = async (req, res) => {
  try {
    const employerId = req.user._id;

    // Get total employees count
    const totalEmployees = await User.countDocuments({
      employer: employerId,
      role: 'employee'
    });

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        pendingApprovals: 0
      }
    });
  } catch (error) {
    console.error('Error getting employee counts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching employee counts',
      error: error.message
    });
  }
};

// @desc Get pending approvals (stub for future implementation)
// @route GET /api/employees/dashboard/pending-approvals
// @access Private (Employer)
exports.getPendingApprovals = async (req, res) => {
  try {
    // This is a stub that returns an empty array
    // Will be implemented when attendance/approvals are added
    res.status(200).json({
      success: true,
      count: 0,
      data: []
    });
  } catch (error) {
    console.error('Error getting pending approvals:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching pending approvals',
      error: error.message
    });
  }
};

// @desc Delete employee (employer scope)
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await User.findOne({
      _id: req.params.id,
      employer: req.user._id,
      role: 'employee',
    });

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.deleteOne();
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete employee', error: error.message });
  }
};

