import Company from "../models/company.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { APIError } from "../utils/APIError.js";
import { uploadImage } from "../utils/cloudinary.js";

// Create new company
const createCompany = asyncHandler(async (req, res) => {
  try {
    const { name, website, industry, location, description, LinkedIn, careersPage, type, averageSalaryBand } = req.body;

    let logoUrl = "";
    if (req.file || (req.files && req.files.logo)) {
      logoUrl = req.file?.path || req.files.logo[0]?.path;
    }

    if (!logoUrl) {
      return res.status(400).json(new APIError(400, "Logo image is required"));
    }

    const logoRes = await uploadImage(logoUrl);
    if (!logoRes?.secure_url) {
      return res.status(500).json(new APIError(500, "Failed to upload logo image"));
    }


    const newCompany = await Company.create({
      name,
      website,
      industry,
      logo: logoRes.url,
      location,
      description,
      LinkedIn,
      careersPage,
      type,
      averageSalaryBand
    });

    if (!newCompany) {
      return res.status(400).json(new APIError(400, "Failed to create company"));
    }

    return res.status(201).json(
      new APIResponse(201, newCompany, "Company created successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new APIError(500, "Failed to create company", error)
    );
  }
});


// Get all companies
const getAllCompanies = asyncHandler(async (req, res) => {
  try {
    const companies = await Company.find();
    return res.status(200).json(
      new APIResponse(200, companies, "Companies retrieved successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new APIError(500, "Failed to retrieve companies", error)
    );
  }
});


// Get company by ID
const getCompanyById = asyncHandler(async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res
        .status(404)
        .json(new APIError(404, "Company not found"));
    }
    return res.status(200).json(
      new APIResponse(200, company, "Company retrieved successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new APIError(500, "Failed to retrieve company", error)
    );
  }
});

// Update company
const updateCompany = asyncHandler(async (req, res) => {
  try {
    const updated = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json(new APIError(404, "Company not found"));
    }
    return res.status(200).json(
      new APIResponse(200, updated, "Company updated successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new APIError(500, "Failed to update company", error)
    );
  }
});

// Delete company
const deleteCompany = asyncHandler(async (req, res) => {
  try {
    const deleted = await Company.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json(new APIError(404, "Company not found"));
    }
    return res.status(200).json(
      new APIResponse(200, null, "Company deleted successfully")
    );
  } catch (error) {
    return res.status(500).json(
      new APIError(500, "Failed to delete company", error)
    );
  }
});

export {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
