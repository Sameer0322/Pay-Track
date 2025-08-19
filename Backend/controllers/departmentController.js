const Department = require('../models/Department');
const User = require('../models/User');

// Create
exports.createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const department = await Department.create({
      name,
      employer: req.user.id,
    });
    res.status(201).json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read (all departments of logged-in employer)
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ employer: req.user.id });
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read (all departments names only for dropdown)
exports.getDepartmentsNames = async (req, res) => {
  try {
    const departments = await Department.find({ employer: req.user.id }, { name: 1 });
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findOneAndUpdate(
      { _id: id, employer: req.user.id },
      { name: req.body.name },
      { new: true }
    );
    if (!department) return res.status(404).json({ message: 'Not found' });
    res.json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete
exports.deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findOneAndDelete({
      _id: id,
      employer: req.user.id,
    });
    if (!department) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEmployeeCountByDepartment = async (req, res) => {
  const { departmentName } = req.params;

  try {
    const count = await User.countDocuments({
      role: 'employee',
      department: departmentName,
      employer: req.user._id,
    });

    res.status(200).json({ department: departmentName, count });
  } catch (err) {
    console.error("Error counting employees:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};