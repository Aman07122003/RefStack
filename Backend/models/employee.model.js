import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    emails: [
      {
        type: String,
        trim: true,
        lowercase: true,
      }
    ],

    image: {
      type: String,
    },

    designation: {
      type: String,
      required: true,
    },

    linkedIn: String,
    twitter: String,
    github: String,

    phoneNumbers: [
      {
        type: String,
        trim: true,
      }
    ],

    successLevel: {
      type: Number,
      min: 1,
      max: 10,
      default: 5,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    notes: {
      type: String,
      trim: true
    },

    isContacted: {
      type: Boolean,
      default: false
    },

    lastContactedAt: Date
  },
  { timestamps: true }
);

employeeSchema.index(
  { user: 1, company: 1, linkedIn: 1 },
  { unique: true }
);

export default mongoose.model("Employee", employeeSchema);