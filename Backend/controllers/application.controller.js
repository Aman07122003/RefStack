import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import Application from "../models/application.model.js";

export const createApplication = asyncHandler(async (req, res) => {
    const userId = req.user._id;
  
    const {
      jobUrl,
      company,
      roleTitle,
      status,
      platform,
      appliedWithReferral,
      referralPerson,
      hr,
      appliedDate,
      priority,
      remarks,
      location,
      salary,
      jobType,
      workMode,
      nextStep,
      nextInterviewDate,
      attachments,
      notes,
      rejectionReason
    } = req.body;

    const existing = await Application.findOne({ user: userId, jobUrl });
    if (existing) {
    throw new APIError(400, "Application already exists for this job");
    }
  
    if (!jobUrl || !company || !roleTitle) {
      throw new APIError(400, "Job URL, company and role title are required");
    }
  
    if (status === "Rejected" && !rejectionReason) {
      throw new APIError(400, "Rejection reason is required when status is Rejected");
    }
  
    const newApplication = await Application.create({
      user: userId,
      jobUrl,
      company,
      roleTitle,
      status,
      platform,
      appliedWithReferral,
      referralPerson,
      hr: hr ? {
        name: hr.name,
        designation: hr.designation,
        email: hr.email,
        linkedinUrl: hr.linkedinUrl
      } : undefined,
      appliedDate,
      priority,
      remarks,
      location,
      salary,
      jobType,
      workMode,
      nextStep,
      nextInterviewDate,
      attachments,
      notes,
      rejectionReason
    });
  
    return res.status(201).json(
      new APIResponse(
        201,
        newApplication,
        "Application created successfully"
      )
    );
  });
  
  export const getAllApplication = asyncHandler(async (req, res) => {
    try {
      const application = await Application.find();
      return res.status(200).json(
        new APIResponse(200, application, "Applications retrieved successfully")
      );
    } catch (error) {
      return res.status(500).json(
        new APIError(500, "Failed to retrieve Applications", error)
      );
    }
  });
  
  export const getApplicationById = asyncHandler(async (req, res) => {
    try {
      const application = await Application.findById(req.params.id);
      if (!application) {
        return res
          .status(404)
          .json(new APIError(404, "Application not found"));
      }
      return res.status(200).json(
        new APIResponse(200, application, "Application retrieved successfully")
      );
    } catch (error) {
      return res.status(500).json(
        new APIError(500, "Failed to retrieve Application", error)
      );
    }
  });
  
  export const updateApplication = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { applicationId } = req.params;
  
    const application = await Application.findOne({
      _id: applicationId,
      user: userId
    });
  
    if (!application) {
      throw new APIError(404, "Application not found");
    }
  
    const updatedApplication = await Application.findByIdAndUpdate(
      applicationId,
      req.body,
      { new: true, runValidators: true }
    );
  
    return res.status(200).json(
      new APIResponse(
        200,
        updatedApplication,
        "Application updated successfully"
      )
    );
  });

  export const deleteApplication = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { applicationId } = req.params;
  
    const application = await Application.findOneAndDelete({
      _id: applicationId,
      user: userId
    });
  
    if (!application) {
      throw new APIError(404, "Application not found");
    }
  
    return res.status(200).json(
      new APIResponse(
        200,
        null,
        "Application deleted successfully"
      )
    );
  });