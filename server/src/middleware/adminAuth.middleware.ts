import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import HttpStatus from '../utils/httpstatus';
import logger from '../utils/logger';

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "fallbackSecret";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const verifyToken = (expectedRole: string) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers?.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "Access token missing or malformed" });
        return
      }

      const token = authHeader.split(" ")[1]; // Extract the token part from "Bearer TOKEN"

      const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as {
        id: string;
        role: string;
      };

      if (decoded.role !== expectedRole) {
        res.status(HttpStatus.FORBIDDEN).json({ message: "Unauthorized role" });
        return;
      }

      req.user = { id: decoded.id, role: decoded.role };
      next();
    } catch (error) {
      logger.error("JWT verification error", error);
      res.status(HttpStatus.UNAUTHORIZED).json({ message: "Invalid or expired token" });
    }
};
