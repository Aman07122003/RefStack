import mongoose from "mongoose";

const hrSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },

    designation: {
      type: String,
      trim: true
    },

    email: {
      type: String,
      trim: true,
      lowercase: true
    },

    linkedinUrl: {
      type: String,
      trim: true
    }
  },
  { _id: false }
);

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    jobUrl: {
      type: String,
      trim: true,
      required: true,
    },
    
    company: {
      type: String,
      required: true,
    },

    roleTitle: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Applied", "Interviewing", "Rejected", "Offered", "Ghosted"],
      default: "Applied",
    },

    platform: {
      type: String,
      enum: ["LinkedIn", "Naukri", "Internshala", "CareersPage", "Referral"],
    },

    appliedWithReferral: {
      type: Boolean,
      default: false,
    },

    referralPerson: {
      type: String, // friend/senior who referred
      trim: true
    },

    hr: hrSchema, // 👈 structured HR info

    appliedDate: {
      type: Date,
      default: Date.now
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    remarks: {
      type: String,
      trim: true
    },

    // New fields added below
    location: {
      type: String,
      trim: true,
      description: "Job location (city, remote, etc.)"
    },

    salary: {
      type: String,
      trim: true,
      description: "Salary range or CTC (e.g., '$80k-$100k')"
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Freelance"],
      description: "Type of employment"
    },

    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      description: "Work arrangement"
    },

    nextStep: {
      type: String,
      trim: true,
      description: "Description of the next action (e.g., 'Technical interview on Friday')"
    },

    nextInterviewDate: {
      type: Date,
      description: "Date and time of the next interview"
    },

    attachments: [{
      type: String, 
      trim: true
    }],

    notes: {
      type: String,
      trim: true,
      description: "Extended notes or private comments"
    },

    rejectionReason: {
      type: String,
      trim: true,
      description: "Reason for rejection if status is Rejected"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);