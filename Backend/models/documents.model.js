import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    documentType: {
      type: String,
      required: true,
      enum: [
        "Resume",
        "CoverLetter",
        "10thMarksheet",
        "12thMarksheet",
        "GraduationMarksheet",
        "Certificate",
        "Aadhaar",
        "PAN",
        "Passport",
        "Other"
      ]
    },

    title: {
      type: String,
      trim: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    publicId: {
      type: String, // Cloudinary public_id (important for delete/update)
      required: true
    },

    isPrivate: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Document", documentSchema);