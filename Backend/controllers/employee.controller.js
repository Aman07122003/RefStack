import Employee from "../models/employee.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/APIError.js";
import { APIResponse } from "../utils/APIResponse.js";
import { uploadImage } from "../utils/cloudinary.js";


const createEmployee = asyncHandler(async (req, res) => {
    try {
        const { fullName, email, designation, linkedIn, twitter, github, PhoneNumber, successlevel, companyId } = req.body;
        let avatarUrl = "";
        if (req.file || (req.files && req.files.avatar)) {
            avatarUrl = req.file?.path || req.files.avatar[0]?.path;
        }
        if (!avatarUrl) {
            return res
                .status(400)
                .json(new APIError(400, "Avatar image is required"));
        }
        const avatarRes = await uploadImage(avatarUrl);
        if (!avatarRes?.secure_url) {
            return res
                .status(500)
                .json(new APIError(500, "Failed to upload avatar image"));
        }
        const employee = await Employee.create({
            fullName,
            email,
            image: avatarRes.url,
            designation,
            linkedIn,
            twitter,
            github,
            PhoneNumber,
            successlevel,
            companyId
        });
        if (!employee) {
            return res
                .status(400)
                .json(new APIError(400, "Failed to create employee"));
        }
        return res
            .status(201)
            .json(
                new APIResponse(
                    201, 
                    employee, "Employee created successfully"));
    }
    catch (error) {
        return res
            .status(500)
            .json(new APIError(500, "Failed to create employee", error));
    }
});

const getAllEmployees = asyncHandler(async (req, res) => {
    try {
        const employees = await Employee.find().populate("companyId");
        return res
            .status(200)
            .json(new APIResponse(200, employees, "Employees retrieved successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new APIError(500, "Failed to retrieve employees", error));
    }
});

const getEmployeeById = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id).populate("companyId");
        if (!employee) {
            return res
                .status(404)
                .json(new APIError(404, "Employee not found"));
        }
        return res
            .status(200)
            .json(new APIResponse(200, employee, "Employee retrieved successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new APIError(500, "Failed to retrieve employee", error));
    }
});

const updateEmployee = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("companyId");
        if (!employee) {
            return res
                .status(404)
                .json(new APIError(404, "Employee not found"));
        }
        return res
            .status(200)
            .json(new APIResponse(200, employee, "Employee updated successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new APIError(500, "Failed to update employee", error));
    }
});

const deleteEmployee = asyncHandler(async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res
                .status(404)
                .json(new APIError(404, "Employee not found"));
        }
        return res
            .status(200)
            .json(new APIResponse(200, null, "Employee deleted successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new APIError(500, "Failed to delete employee", error));
    }
});

const getEmployeesByCompanyId = asyncHandler(async (req, res) => {
    try {
        const employees = await Employee.find({ companyId: req.params.companyId }).populate("companyId");
        if (employees.length === 0) {
            return res
                .status(404)
                .json(new APIError(404, "No employees found for this company"));
        }
        return res
            .status(200)
            .json(new APIResponse(200, employees, "Employees retrieved successfully"));
    }
    catch (error) {
        return res
            .status(500)
            .json(new APIError(500, "Failed to retrieve employees", error));
    }
});

export {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getEmployeesByCompanyId
  };
  
