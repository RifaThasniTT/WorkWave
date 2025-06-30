import nodemailer from "nodemailer";
import logger from "./logger";
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
});

export const sentOtpEmail = async (email: string, otp: string) => {
    try {
        await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "Your OTP for WorkWave account verification",
            text: `Your OTP for WorkWave account verification is: ${otp}. This will expire in 2 minutes.`
        });
    } catch (error) {
        logger.error('Failed to sent OTP email ', error);
        throw new Error(`Failed to send OTP email`);
    }
}

