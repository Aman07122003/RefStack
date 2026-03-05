import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  filterApplications,
  filterCompanies,
  filterEmployees,
  filterGithubRepos
} from "../controllers/filter.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/applications", filterApplications);      // /api/v1/filter/applications?status=Applied,Interview&page=1
router.get("/companies", filterCompanies);            // /api/v1/filter/companies?industry=IT&location=Delhi
router.get("/employees", filterEmployees);            // /api/v1/filter/employees?designation=HR&minSuccess=50
router.get("/githubrepos", filterGithubRepos);        // /api/v1/filter/githubrepos?minStars=100&techStack=JavaScript

export default router;