import { Request, Response, Router } from "express";
import { container } from "../di/container";
import UserAuthController from "../controllers/user/auth.controller";
import TYPES from "../di/types";

const router = Router();

const authController = container.get<UserAuthController>(TYPES.UserAuthController);

//Authentication
router.post('/register', authController.signup.bind(authController));
router.post('/verify-otp', authController.verifyOtp.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/resend-otp', authController.resendOtp.bind(authController));

export default router;