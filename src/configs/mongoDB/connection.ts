import mongoose from "mongoose";
import { logger } from "../../utils/logger"; // adjust path as needed

export const connectMongoDB = async () => {
  const MONGO_URI: string =
    (process.env.MONGO_DB_URL as string) || "mongodb://localhost:27017/myapp";
  try {
    const connection = await mongoose.connect(`${MONGO_URI}/D-mart`);
    logger.info(`🟢 MongoDB connected successfully to ${connection.connection.name}`);
  } catch (error) {
    logger.error("🔴 MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};
