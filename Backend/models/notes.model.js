import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    question: {
      heading: { type: String, required: true },
      examples: [
        {
          description: { type: String, required: true },
          images: [{ type: String }]
        }
      ]
    },

    solutions: [
      {
        type: {
          type: String, // e.g. "Brute Force", "Better Approach", "Best Approach"
          required: true
        },
        paragraphs: [{ type: String }], 
        images: [{ type: String }],
        code: {
          language: { type: String, default: "javascript" },
          content: { type: String }
        }
      }
    ],

    solvedBy: [{ type: String }], 

    noteType: [{ type: String, required: true }], 

    category: { type: String },
    subCategory: { type: String },

    tags: [{ type: String }],

    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
    source: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Note", noteSchema);
