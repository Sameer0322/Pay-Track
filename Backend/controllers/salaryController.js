const Salary = require('../models/Salary');
const User = require('../models/User');

// Create a new salary record (Employer only)
exports.createSalary = async (req, res) => {
  try {
    const {
      employee, // ✅ Must be provided in the body
      fixedSalary,
      extraAmount,
      deductions,
      paymentDate,
      paymentMode,
      proof
    } = req.body;

    const employerId = req.user._id; // from auth middleware

    const salary = new Salary({
      employee,
      employer: employerId,
      fixedSalary,
      extraAmount: extraAmount || 0,
      deductions: deductions || 0,
      paymentDate,
      paymentMode: paymentMode || 'Bank Transfer',
      proof: proof || '',
    });

    await salary.save();
    res.status(201).json({ message: 'Salary record created successfully', salary });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create salary record', error: error.message });
  }
};

// Get salaries with optional filters
exports.getSalaries = async (req, res) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    const { employee, department, startDate, endDate } = req.query;

    let filter = {};

    if (role === 'employer') {
      filter.employer = userId;
      if (employee) filter.employee = employee;

      if (department) {
        const employeesInDept = await User.find({ employer: userId, department }).select('_id');
        filter.employee = { $in: employeesInDept.map(e => e._id) };
      }
    } else if (role === 'employee') {
      filter.employee = userId;
    }

    if (startDate || endDate) {
      filter.paymentDate = {};
      if (startDate) filter.paymentDate.$gte = new Date(startDate);
      if (endDate) filter.paymentDate.$lte = new Date(endDate);
    }

    const salaries = await Salary.find(filter)
      .populate('employee', 'name employeeID department')
      .sort({ paymentDate: -1 });

    res.json({ salaries });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch salary records', error: error.message });
  }
};

// Update salary (Employer only)
exports.updateSalary = async (req, res) => {
  try {
    const employerId = req.user._id;
    const salaryId = req.params.id;
    const updates = req.body;

    const salary = await Salary.findOne({ _id: salaryId, employer: employerId });
    if (!salary) {
      return res.status(404).json({ message: 'Salary record not found or unauthorized' });
    }

    if ('employeeConfirmed' in updates) delete updates.employeeConfirmed;

    Object.assign(salary, updates);
    await salary.save();

    res.json({ message: 'Salary updated successfully', salary });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update salary', error: error.message });
  }
};

// Employee confirms salary receipt
exports.confirmSalaryReceipt = async (req, res) => {
  try {
    const employeeId = req.user._id;
    const salaryId = req.params.id;

    const salary = await Salary.findOne({ _id: salaryId, employee: employeeId });
    if (!salary) {
      return res.status(404).json({ message: 'Salary record not found or unauthorized' });
    }

    salary.employeeConfirmed = true;
    await salary.save();

    res.json({ message: 'Salary receipt confirmed', salary });
  } catch (error) {
    res.status(500).json({ message: 'Failed to confirm salary receipt', error: error.message });
  }
};

// Delete salary record
exports.deleteSalary = async (req, res) => {
  try {
    const employerId = req.user._id;
    const salaryId = req.params.id;

    const salary = await Salary.findOneAndDelete({ _id: salaryId, employer: employerId });
    if (!salary) {
      return res.status(404).json({ message: 'Salary record not found or unauthorized' });
    }

    res.json({ message: 'Salary record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete salary', error: error.message });
  }
};
