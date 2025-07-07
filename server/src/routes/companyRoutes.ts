import { Router } from "express";
import { container } from "../di/container";
import CompanyAuthController from "../controllers/company/auth.controller";
import TYPES from "../di/types";
import { uploadCompanyKyc, uploadCompanyProfile } from "../middleware/multer";
import CompanyProfileController from "../controllers/company/profile.controller";
import { verifyToken } from "../middleware/adminAuth.middleware";

const router = Router();
const authController = container.get<CompanyAuthController>(TYPES.CompanyAuthController);
const profileController = container.get<CompanyProfileController>(TYPES.CompanyProfileController);

//Authentication
router.post("/register", uploadCompanyKyc.single("kyc"), authController.register.bind(authController));
router.post("/verify-otp", authController.verifyOtp.bind(authController));
router.post("/resend-otp", authController.resendOtp.bind(authController));
router.post("/login", authController.login.bind(authController));
router.post("/logout", verifyToken("company"), authController.logout.bind(authController));

//Profile Management
router.get("/profile", verifyToken("company"), profileController.getProfile.bind(profileController));
router.patch("/profile", verifyToken("company"), uploadCompanyProfile.single("logoUrl"), profileController.updateProfile.bind(profileController));

export default router;