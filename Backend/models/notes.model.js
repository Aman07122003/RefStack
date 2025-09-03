// models/Note.js
import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  question: {
      type: String,
      required: true
  },
  pdfFile: {
    type: String, // store public URL
    default: null
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  subCategory: {
    type: String,
    default: '',
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  source: {
    type: String,
    default: '',
    trim: true
  },
  video: {
    type: String,
    default: '',
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


export default mongoose.model('Note', NoteSchema);