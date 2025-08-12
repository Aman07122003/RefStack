import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

// Create a new company
router.route("/").post(
  upload.fields([
    { name: "logo", maxCount: 1 },
  ]),
  createCompany);

// Get all companies
router.get("/", getAllCompanies);

// Get a company by ID
router.get("/:id", getCompanyById);

// Update a company by ID
router.put("/:id", updateCompany);

// Delete a company by ID
router.delete("/:id", deleteCompany);

export default router;
