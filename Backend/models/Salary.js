const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fixedSalary: {
      type: Number,
      required: true,
    },
    extraAmount: {
      type: Number,
      default: 0,
    },
    deductions: {
      type: Number,
      default: 0,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ['Bank Transfer', 'Cash', 'Cheque', 'Other'],
      default: 'Bank Transfer',
    },
    disbursed: {
      type: Boolean,
      default: false,
    },
    employeeConfirmed: {
      type: Boolean,
      default: false,
    },
    proof: {
      type: String, // URL or file path
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Salary', salarySchema);
