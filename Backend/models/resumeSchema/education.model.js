import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    title: String,
    institute: String,
    city: String,
    country: String,
    state: String,
    startDate: Date,
    endDate: Date,
    description: String,
  },
  { _id: false }
);

export default educationSchema;