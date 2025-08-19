const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: 'Please provide a valid email address',
      },
    },
    employerId: {
      type: String,
      required: function() {return this.role === 'employer' || this.role === 'employee'},
    },
    employeeId: {
      type: String,
      required: function() {return this.role === 'employee'},
    },
    password: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    designation: {
      type: String,
    },
    salary: {
      type: Number,
    },
    joiningDate: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['employer', 'employee'],
      required: true,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: function() {return this.role === 'employee'},
    },
    organization: {
      type: String,
      required: function() {return this.role === 'employer'},
    },
  },
  { timestamps: true }
);

// Compound Unique Index
userSchema.index({ employerId: 1, employeeId: 1 }, { unique: true, sparse: true });

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
