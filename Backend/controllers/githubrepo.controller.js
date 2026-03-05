import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import GithubProject from "../models/repoSchema.model.js";

export const createRepo = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url) {
    throw new APIError(400, "Repository URL is required");
  }

  // 🔍 Extract owner and repo
  const cleanedUrl = url.replace("https://github.com/", "").trim();
  const parts = cleanedUrl.split("/");

  if (parts.length < 2) {
    throw new APIError(400, "Invalid GitHub repository URL");
  }

  const [owner, repo] = parts;

  let data;

  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    data = response.data;

  } catch (error) {
    throw new APIError(404, "GitHub repository not found");
  }

  // ✅ Match schema exactly
  const repoData = {
    githubRepoId: data.id.toString(),
    repoName: data.name,
    description: data.description,
    githubUrl: data.html_url,
    techStack: data.language ? [data.language] : [],
    stars: data.stargazers_count,
    forks: data.forks_count,
    topics: data.topics || [],
    createdAtGithub: data.created_at,
    updatedAtGithub: data.updated_at,
    lastSyncedAt: new Date(),
  };

  try {
    const newRepo = await GithubProject.create(repoData);

    return res.status(201).json(
      new APIResponse(201, newRepo, "Repository saved successfully")
    );

  } catch (error) {

    // 🚨 Handle duplicate repo
    if (error.code === 11000) {
      throw new APIError(400, "Repository already saved");
    }

    throw new APIError(500, "Failed to save repository");
  }
});

export const getAllRepos = asyncHandler(async (req, res) => {
  const repos = await GithubProject.find().sort({ createdAt: -1 });

  return res.status(200).json(
    new APIResponse(200, repos, "Repositories retrieved successfully")
  );
});

export const getReposByTopic = asyncHandler(async (req, res) => {
  const { topic } = req.query;

  if (!topic) {
    throw new APIError(400, "Topic is required");
  }

  const repos = await GithubProject.find({
    topics: topic
  });

  return res.status(200).json(
    new APIResponse(200, repos, "Repositories filtered by topic")
  );
});