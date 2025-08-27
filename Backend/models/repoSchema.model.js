import mongoose from "mongoose";

const repoSchema = new mongoose.Schema({
    name: String,
    tag: String,
    full_name: String,
    description: String,
    html_url: String,
    stars: Number,
    forks: Number,
    issues: Number,
    language: String,
    owner: String,
    topics: [String]
  });

const Repo = mongoose.model("Repo", repoSchema);
export default Repo;