import mongoose from "mongoose";
import { encrypt, decrypt } from "../../utils/encryption.js";

const aiSettingsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },

    provider: {
      type: String,
      enum: ["openai", "claude"],
      required: true
    },

    encryptedApiKey: {
      type: String,
      required: true,
      select: false
    },

    preferredModel: {
      type: String,
      default: "gpt-4o-mini"
    },

    dailyLimit: {
      type: Number,
      default: 10
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);


// 🔐 Encrypt API key before save
aiSettingsSchema.pre("save", function (next) {
  if (!this.isModified("encryptedApiKey")) {
    return next();
  }

  this.encryptedApiKey = encrypt(this.encryptedApiKey);
  next();
});


// 🔓 Decrypt method
aiSettingsSchema.methods.getDecryptedApiKey = function () {
  return decrypt(this.encryptedApiKey);
};

export default mongoose.model("AISettings", aiSettingsSchema);