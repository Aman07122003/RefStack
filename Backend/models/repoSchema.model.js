import mongoose from "mongoose";

const githubProjectSchema = new mongoose.Schema(
  {
    githubRepoId: {
      type: String,
      required: true
    },

    repoName: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    githubUrl: {
      type: String,
      required: true,
      trim: true
    },

    techStack: [
      {
        type: String,
        trim: true
      }
    ],

    stars: {
      type: Number,
      default: 0
    },

    forks: {
      type: Number,
      default: 0
    },

    topics: [String],

    createdAtGithub: Date,
    updatedAtGithub: Date,

    lastSyncedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// Prevent duplicate repo save per user
githubProjectSchema.index(
  { githubRepoId: 1 },
  { unique: true }
);

export default mongoose.model("GithubProject", githubProjectSchema);