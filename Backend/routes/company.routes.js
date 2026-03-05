import express from "express";
import {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
} from "../controllers/company.controller.js";
import { uploadImages } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.route("/").post(
  uploadImages.fields([
    { name: "logo", maxCount: 1 },
  ]),
  createCompany);

router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.put("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export default router;
