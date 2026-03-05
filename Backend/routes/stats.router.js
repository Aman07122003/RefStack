import express from "express";
import {
  getApplicationStats,
  getCompanyStats,
  getEmployeeStats,
  getGithubStats
} from "../controllers/stats.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.get("/applications", getApplicationStats);
router.get("/companies", getCompanyStats);
router.get("/employees", getEmployeeStats);
router.get("/github", getGithubStats);

export default router;