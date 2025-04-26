const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date, required: true },
  department: { type: String, required: true },
  enrollmentYear: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  profilePhoto: { type: String }, // URL or base64 string
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
