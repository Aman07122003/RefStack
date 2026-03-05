import mongoose from "mongoose";

const aiHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    provider: {
      type: String,
      enum: ["openai", "claude"],
      required: true
    },

    featureType: {
      type: String,
      enum: [
        "ResumeOptimization",
        "CoverLetterGeneration",
        "ReferralMessage",
        "JDAnalysis",
        "InterviewPrep",
        "SkillGapAnalysis",
        "CompanyResearch",
        "GeneralChat"
      ],
      required: true
    },

    inputPrompt: {
      type: String,
      required: true
    },

    outputResponse: {
      type: String
    },

    tokensUsed: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success"
    },

    errorMessage: String
  },
  { timestamps: true }
);

export default mongoose.model("AIHistory", aiHistorySchema);