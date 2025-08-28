import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MONGODB_URI: string =
  process.env.MONGODB_URI || "mongodb://localhost:27017/bookmarks-app";

// ✅ Connect to MongoDB
export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`✅ Connected to MongoDB at ${MONGODB_URI}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Stop app if DB connection fails
  }
};

// 🔌 Disconnect from MongoDB
export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ MongoDB disconnection error:", error);
  }
};
