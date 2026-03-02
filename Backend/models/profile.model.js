import mongoose from "mongoose";
import socialMediaSchema from "./resumeSchema/socialMediaSchema.model.js";
import skillSchema from "./resumeSchema/skills.model.js";
import educationSchema from "./resumeSchema/education.model.js";
import projectSchema from "./resumeSchema/project.model.js";
import certificateSchema from "./resumeSchema/certification.model.js";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phone: Number,
    dob: Date,
    address: String,
    nationality: String,
    bio: String,

    socialMedia: [socialMediaSchema],
    skills: [skillSchema],
    education: [educationSchema],
    projects: [projectSchema],
    certifications: [certificateSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Profile", profileSchema);