import { Router } from "express";
import {
  createOrUpdateProfile,
  getMyProfile,
  deleteProfile,
  getProfileByUserId,
  updateBasicInfo,
  updateSocialMedia,
  updateSkills,
  addEducation,
  updateEducation,
  addProject,
  updateProjects,
  addCertification,
  updateCertifications,
} from "../controllers/profile.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.use(verifyJWT);


router.route("/")
  .post(createOrUpdateProfile)
  .get(getMyProfile)
  .delete(deleteProfile);

router.route("/:userId").get(getProfileByUserId);

router.route("/update/basic-info").patch(updateBasicInfo);

router.route("/update/social-media").patch(updateSocialMedia);

router.route("/update/skills").patch(updateSkills);

router.route("/education")
  .post(addEducation)
  .put(updateEducation);

router.route("/projects")
  .post(addProject)
  .put(updateProjects);
  
router.route("/certifications")
  .post(addCertification)
  .put(updateCertifications);

export default router;