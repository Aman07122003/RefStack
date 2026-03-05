import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    website: {
      type: String,
      required: true,
      trim: true
    },

    industry: String,

    logo: String,

    location: String,

    description: String,

    linkedinUrl: String,

    careersPage: String,

    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "500+"]
    },

    type: {
      type: String,
      enum: ["Startup", "Service", "Product", "Government", "Freelance", "Agency"],
      default: "Startup"
    },

    averageSalaryBand: {
      type: String,
      enum: [
        "Under 2 LPA",
        "2 - 5 LPA",
        "5 - 10 LPA",
        "Over 10 LPA"
      ],
      default: "Under 2 LPA"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Company", companySchema);


