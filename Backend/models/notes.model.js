import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    question: {
      heading: { type: String, required: true },
      description: { type: String },
      examples: [
        {
          type: {
            type: String,
            enum: ["text", "image"],
            required: true,
          },
          value: { type: String, required: true },
        }
      ]
    },

    solutions: [
      {
        type: {
          type: String,
          enum: ["text", "image", "code"],
          required: true
        },
        value: { type: String, required: true },
      }
    ],

    category: { type: String },
    subCategory: { type: String },

    tags: [{ type: String }],

    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
    source: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
