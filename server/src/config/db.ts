import mongoose from "mongoose";
import logger from "../utils/logger";
import { error } from "console";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        logger.info('MongoDB connected successfully!');
    } catch (error) {
        logger.error('Mongo DB failed to connect: ', error);
        process.exit(1)
    }
}