import { Router } from "express";
import {
  uploadUserDocument,
  getUserDocuments,
  getSingleDocument,
  updateUserDocument,
} from "../controllers/document.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadPdf } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
  .get(getUserDocuments)
  .post(uploadPdf.single("document"), uploadUserDocument);

router.route("/:documentId")
  .get(getSingleDocument)
  .patch(uploadPdf.single("document"), updateUserDocument);

export default router;