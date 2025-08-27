import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import Repo from "../models/repoSchema.model.js";
import mongoose from "mongoose";

// Create new repo from GitHub link
const createRepo = asyncHandler(async (req, res) => {
  try {
    const { url, tag } = req.body;
    if (!url) {
      return res.status(400).json(new APIError(400, "Repository URL is required"));
    }

    const parts = url.replace("https://github.com/", "").split("/");
    if (parts.length < 2) {
      return res.status(400).json(new APIError(400, "Invalid GitHub repository URL"));
    }
    const [owner, repo] = parts;

    let data;
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: { "Accept": "application/vnd.github+json" }
      });
      data = response.data;
    } catch (err) {
      return res.status(404).json(new APIError(404, "GitHub repository not found", err.message));
    }

    const repoData = {
      name: data.name,
      tag: tag || "General",
      full_name: data.full_name,
      description: data.description,
      html_url: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      issues: data.open_issues_count,
      language: data.language,
      owner: data.owner.login,
      topics: data.topics || []
    };

    const newRepo = await Repo.create(repoData);

    return res.status(201).json(
      new APIResponse(201, newRepo, "Repository saved successfully")
    );

  } catch (error) {
    return res.status(500).json(
      new APIError(500, "Failed to create repository", error.message)
    );
  }
});

// Get all repos
const getAllRepos = asyncHandler(async (req, res) => {
  try {
    const repos = await Repo.find(); // removed .populate('topics')
    return res.status(200).json(
      new APIResponse(200, repos, "Repositories retrieved successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new APIError(500, "Failed to retrieve repositories", error)
    );
  }
});

// Get repo by ID
const getRepoById = asyncHandler(async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json(new APIError(400, "Invalid repository ID"));
    }

    const repo = await Repo.findById(req.params.id);
    if (!repo) {
      return res.status(404).json(new APIError(404, "Repository not found"));
    }

    return res.status(200).json(
      new APIResponse(200, repo, "Repository retrieved successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new APIError(500, "Failed to retrieve repository", error)
    );
  }
});

export { createRepo, getAllRepos, getRepoById };
