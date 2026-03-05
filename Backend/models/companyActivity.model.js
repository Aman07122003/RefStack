import mongoose from "mongoose";

const companyActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true
    },

    lastCheckedAt: [{
      type: Date,
    }],

    checkCount: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

companyActivitySchema.index(
  { user: 1, company: 1 },
  { unique: true }
);

export default mongoose.model("CompanyActivity", companyActivitySchema);