import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['Manager', 'Developer', 'Designer', 'Intern'],
    default: 'Developer'
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['Engineering', 'Design', 'Marketing', 'HR'],
    default: 'Engineering'
  },
  phone: {
    type: String,
    trim: true,
    default: null
  },
  avatar_url: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Generate avatar URL if not provided
employeeSchema.pre('save', function(next) {
  if (!this.avatar_url && this.name) {
    this.avatar_url = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.name)}&background=random`;
  }
  next();
});

export const Employee = mongoose.model('Employee', employeeSchema);
