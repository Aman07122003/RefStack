import mongoose from 'mongoose';

const employee = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    designation: {
      type: String,
      required: true,
    },
    linkedIn: {
      type: String,
    },
    twitter: {
      type: String,
    },
    github: {
      type: String,
    },
    PhoneNumber: {
      type: String,
      trim: true,
    },
    successlevel: {
        type: String,
        enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        default: '5',
        },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model('Employee', employee);
export default Employee;
