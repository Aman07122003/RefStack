import Company from "../models/company.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIResponse } from "../utils/APIResponse.js";
import { APIError } from "../utils/APIError.js";
import { uploadImage, deleteImage } from "../utils/cloudinary.js";
import CompanyActivity from "../models/companyActivity.model.js"

export const createCompany = asyncHandler(async (req, res) => {
  try {
    const { name, website, industry, location, description, LinkedIn, careersPage, type, companySize, averageSalaryBand } = req.body;
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
      companySize,
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

export const getAllCompanies = asyncHandler(async (req, res) => {
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

export const getCompanyById = asyncHandler(async (req, res) => {
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

export const updateCompany = asyncHandler(async (req, res) => {
  const companyId = req.params.id;

  const {
    name,
    website,
    industry,
    location,
    description,
    linkedinUrl,
    careersPage,
    companySize,
    type,
    averageSalaryBand
  } = req.body;

  const company = await Company.findById(companyId);

  if (!company) {
    throw new APIError(404, "Company not found");
  }

  company.name = name || company.name;
  company.website = website || company.website;
  company.industry = industry || company.industry;
  company.location = location || company.location;
  company.description = description || company.description;
  company.linkedinUrl = linkedinUrl || company.linkedinUrl;
  company.careersPage = careersPage || company.careersPage;
  company.companySize = companySize || company.companySize;
  company.type = type || company.type;
  company.averageSalaryBand = averageSalaryBand || company.averageSalaryBand;

  if (req.files && req.files.logo && req.files.logo.length > 0) {
    if (company.logo) {
      await deleteImage(company.logo);
    }

    const logoLocalPath = req.files.logo[0].path;
    const logoUpload = await uploadImage(logoLocalPath);

    company.logo = logoUpload.url;
  }

  await company.save();

  return res.status(200).json(
    new APIResponse(200, null, "Updated successfully")
  );
});

export const deleteCompany = asyncHandler(async (req, res) => {
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

export const markCheckedToday = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { companyId } = req.params;

  let activity = await CompanyActivity.findOne({
    user: userId,
    company: companyId
  });

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  if (!activity) {
    activity = await CompanyActivity.create({
      user: userId,
      company: companyId,
      lastCheckedAt: [new Date()]
    });
  } else {

    const alreadyChecked = activity.lastCheckedAt.some(date =>
      date >= todayStart && date <= todayEnd
    );

    if (!alreadyChecked) {
      activity.lastCheckedAt.push(new Date());
      await activity.save();
    }
  }

  return res.status(200).json(
    new APIResponse(200, activity, "Checked status updated")
  );
});

export const getCompanyCheckStatus = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { companyId } = req.params;

  const activity = await CompanyActivity.findOne({
    user: userId,
    company: companyId
  });

  let checkedToday = false;

  if (activity && activity.lastCheckedAt.length > 0) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    checkedToday = activity.lastCheckedAt.some(date =>
      date >= todayStart && date <= todayEnd
    );
  }

  return res.status(200).json(
    new APIResponse(200, checkedToday, "Checked today")
  );
});