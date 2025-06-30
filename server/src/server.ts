import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import logger from './utils/logger';
import userRoutes from "./routes/userRoutes";
import companyRoutes from "./routes/companyRoutes";
import adminRoutes from "./routes/adminRoutes";
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true 
}));
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
})
