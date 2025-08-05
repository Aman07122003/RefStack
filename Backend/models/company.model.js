// models/company.model.js
import mongoose from 'mongoose';

const company = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    website: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    LinkedIn: {
      type: String,
    },
    carrersPage: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Startup', 'Service', 'Product', 'Government', 'Freelance'],
        default: 'Startup',
        required: true,
      },
      averageSalaryBand: {
        type: String,
        enum: [
          'Under 2 LPA',
          '2 - 5 LPA',
          '5 - 10 LPA',
          'Over 10 LPA'
        ],
        default: 'Under 2 LPA',
        required: true,
      },
      
  },
  { timestamps: true }
);

const Company = mongoose.model('Company', company);
export default Company;
