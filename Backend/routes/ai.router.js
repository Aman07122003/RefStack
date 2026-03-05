import express from "express";
import {
  saveAICrendentials,
  deleteAICrendentials,
  testAICredentials,
  generateCoverLetter,
  testAIGeneration
} from "../controllers/ai.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/credentials", saveAICrendentials);
router.delete("/credentials", deleteAICrendentials);
router.post("/credentials/test", testAICredentials);
router.post("/cover-letter/:applicationId", generateCoverLetter);
router.post("/test-generate", testAIGeneration);

export default router;