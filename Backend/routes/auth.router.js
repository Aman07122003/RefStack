import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    forgotPassword,
    resetPassword,
    googleLogin,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { uploadImages } from "../middlewares/multer.middleware.js";

const router = Router();

router.post(
    "/register",
    uploadImages.single("avatar"),
    registerUser
  );

router.post("/login", loginUser);
router.post("/google-login", googleLogin);
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;