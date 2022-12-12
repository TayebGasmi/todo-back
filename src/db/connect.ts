import mongoose from "mongoose";
import logger from "../logs/logger";
export default async function connect() {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    logger.info(" Database connection successful");
  } catch (error) {
    console.error(error);
  }
}
