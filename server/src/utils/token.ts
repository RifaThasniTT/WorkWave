import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string || 'asdfj';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string  || 'asfdjsdklfj';

export type UserRole = "user" | "admin" | "interviewer" | "hr" | "company";

export const generateTokens = (id: string, role: UserRole) => {
    const accessToken = jwt.sign({ id, role }, ACCESS_TOKEN_SECRET, { expiresIn: "7h" });
    const refreshToken = jwt.sign({ id, role }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    return {accessToken, refreshToken};
}


export const setTokensAsCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string,
    role: UserRole
) => {
    const accessTokenName = `${role}AccessToken`;
    const refreshTokenName = `${role}RefreshToken`;

    res.cookie(accessTokenName, accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 7 * 60 * 60 * 1000,
    });
    
    res.cookie(refreshTokenName, refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
}