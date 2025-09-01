import mongoose from "mongoose";

const exampleItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'image'],
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const solutionItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'image', 'code'],
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

const exampleSchema = new mongoose.Schema({
  items: [exampleItemSchema]
});

const solutionSchema = new mongoose.Schema({
  items: [solutionItemSchema]
});

const noteSchema = new mongoose.Schema({
  question: {
    heading: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    examples: [exampleSchema]
  },
  solutions: [solutionSchema],
  category: {
    type: String,
    required: true
  },
  subCategory: {
    type: String,
    default: ''
  },
  tags: [{
    type: String
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  source: {
    type: String,
    default: ''
  },
  video: {
    type: String,
    default: ''
  },
  images: [{
    type: String // This will store paths to uploaded images
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
noteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model("Note", noteSchema);




