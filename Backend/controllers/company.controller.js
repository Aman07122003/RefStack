import Company from "../models/company.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { APIError } from "../utils/APIError.js";

// Create new company
const createCompany = asyncHandler(async (req, res) => {
  try {
    const company = await Company.create(req.body);
    return res.status(201).json(
      new APIResponse(201, company, "Company created succesfully")
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
