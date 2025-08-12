import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
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
    logo: {
      type: String,
      required: true,
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
    careersPage: { // ✅ fixed spelling to match controller
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

const Company = mongoose.model('Company', companySchema);
export default Company;
