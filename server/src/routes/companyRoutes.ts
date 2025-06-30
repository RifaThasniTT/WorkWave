import { Router } from "express";
import { container } from "../di/container";
import CompanyAuthController from "../controllers/company/auth.controller";
import TYPES from "../di/types";
import { uploadCompanyKyc } from "../middleware/multer";

const router = Router();
const authController = container.get<CompanyAuthController>(TYPES.CompanyAuthController);

//Authentication
router.post("/register", uploadCompanyKyc.single("kyc"), authController.register.bind(authController));
router.post("/verify-otp", authController.verifyOtp.bind(authController));
router.post("/resend-otp", authController.resendOtp.bind(authController));

export default router;