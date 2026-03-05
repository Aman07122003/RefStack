import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import Company from "../models/company.model.js";
import Application from "../models/application.model.js";
import Employee from "../models/employee.model.js";
import Repo from "../models/repoSchema.model.js";

export const filterApplications = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const {
      status,
      platform,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc"
    } = req.query;
  
    const filter = { user: userId };
  
    if (status) {
      const statusArray = status.split(",");
      filter.status = { $in: statusArray };
    }
  
    if (platform) {
      const platformArray = platform.split(",");
      filter.platform = { $in: platformArray };
    }

    const sortOptions = {};
    sortOptions[sortBy] = order === "asc" ? 1 : -1;
  
    const skip = (page - 1) * limit;
  
    const applications = await Application.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));
  
    const total = await Application.countDocuments(filter);
  
    return res.status(200).json(
      new APIResponse(
        200,
        {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit),
          results: applications
        },
        "Applications fetched successfully"
      )
    );
});

export const filterCompanies = asyncHandler(async (req, res) => {
    const {
      industry,
      type,
      companySize,
      averageSalaryBand,
      location,
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc"
    } = req.query;
  
    const filter = {};
  
    // Multi-value enum filters
    const allowedFilters = [
      "industry",
      "type",
      "companySize",
      "averageSalaryBand",
    ];
  
    allowedFilters.forEach(field => {
      if (req.query[field]) {
        filter[field] = { $in: req.query[field].split(",") };
      }
    });
  
    // Location filter (case-insensitive)
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
  
    // Name search
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }
  
    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = order === "asc" ? 1 : -1;
  
    // Pagination
    const skip = (page - 1) * limit;
  
    const companies = await Company.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));
  
    const total = await Company.countDocuments(filter);
  
    return res.status(200).json(
      new APIResponse(
        200,
        {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit),
          results: companies
        },
        "Companies fetched successfully"
      )
    );
});

export const filterEmployees = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const {
      company,
      designation,
      minSuccess,
      maxSuccess,
      isContacted,
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
      lastContactedFrom,
      lastContactedTo
    } = req.query;
  
    const filter = { user: userId };
  
    // Company filter (multiple support)
    if (company) {
      filter.company = { $in: company.split(",") };
    }
  
    // Designation filter (case-insensitive partial match)
    if (designation) {
      filter.designation = { $regex: designation, $options: "i" };
    }
  
    // Success Level range filter
    if (minSuccess || maxSuccess) {
      filter.successLevel = {};
      if (minSuccess) filter.successLevel.$gte = Number(minSuccess);
      if (maxSuccess) filter.successLevel.$lte = Number(maxSuccess);
    }
  
    // isContacted filter
    if (isContacted !== undefined) {
      filter.isContacted = isContacted === "true";
    }
  
    // Date range filter
    if (lastContactedFrom || lastContactedTo) {
      filter.lastContactedAt = {};
      if (lastContactedFrom)
        filter.lastContactedAt.$gte = new Date(lastContactedFrom);
      if (lastContactedTo)
        filter.lastContactedAt.$lte = new Date(lastContactedTo);
    }
  
    // Search by name
    if (search) {
      filter.fullName = { $regex: search, $options: "i" };
    }
  
    // Sorting
    const sortOptions = {};
    sortOptions[sortBy] = order === "asc" ? 1 : -1;
  
    // Pagination
    const skip = (page - 1) * limit;
  
    const employees = await Employee.find(filter)
      .populate("company", "name industry")
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));
  
    const total = await Employee.countDocuments(filter);
  
    return res.status(200).json(
      new APIResponse(
        200,
        {
          total,
          page: Number(page),
          pages: Math.ceil(total / limit),
          results: employees
        },
        "Employees fetched successfully"
      )
    );
});

export const filterGithubRepos = asyncHandler(async (req, res) => {
const {
    techStack,
    topics,
    minStars,
    maxStars,
    minForks,
    maxForks,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
    search,
    page = 1,
    limit = 10,
    sortBy = "stars",
    order = "desc"
} = req.query;

const filter = {};

// Filter by tech stack (multiple support)
if (techStack) {
    filter.techStack = { $in: techStack.split(",") };
}

// Filter by topics (multiple support)
if (topics) {
    filter.topics = { $in: topics.split(",") };
}

// Stars range filter
if (minStars || maxStars) {
    filter.stars = {};
    if (minStars) filter.stars.$gte = Number(minStars);
    if (maxStars) filter.stars.$lte = Number(maxStars);
}

// Forks range filter
if (minForks || maxForks) {
    filter.forks = {};
    if (minForks) filter.forks.$gte = Number(minForks);
    if (maxForks) filter.forks.$lte = Number(maxForks);
}

// Created date range
if (createdFrom || createdTo) {
    filter.createdAtGithub = {};
    if (createdFrom)
    filter.createdAtGithub.$gte = new Date(createdFrom);
    if (createdTo)
    filter.createdAtGithub.$lte = new Date(createdTo);
}

// Updated date range
if (updatedFrom || updatedTo) {
    filter.updatedAtGithub = {};
    if (updatedFrom)
    filter.updatedAtGithub.$gte = new Date(updatedFrom);
    if (updatedTo)
    filter.updatedAtGithub.$lte = new Date(updatedTo);
}

// Search by repo name (case-insensitive)
if (search) {
    filter.repoName = { $regex: search, $options: "i" };
}

// Sorting
const sortOptions = {};
sortOptions[sortBy] = order === "asc" ? 1 : -1;

// Pagination
const skip = (page - 1) * limit;

const repos = await Repo.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(Number(limit));

const total = await Repo.countDocuments(filter);

return res.status(200).json(
    new APIResponse(
    200,
    {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        results: repos
    },
    "Repositories fetched successfully"
    )
);
});