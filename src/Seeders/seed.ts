// src/seeders/seed.ts

import { connectDB, disconnectDB } from "../config/db.config";
import { seedUsers } from "./user.seeder";
import { seedBookmarks } from "../Seeders/bookmark.seeder";

const seed = async () => {
  console.log("🚀 Starting seeding...");

  try {
    // 1️⃣ Connect to DB
    await connectDB();

    //  2️⃣ Seed Users
    console.log("\n👤 Seeding users...");
    const users = await seedUsers();

// 3️⃣  Seed Bookmarks (for each user)
    console.log("\n🔖 Seeding bookmarks...");
    await seedBookmarks(users);

    // 4️⃣ Disconnect DB
    await disconnectDB();

    console.log("\n🎉 Seeding completed!");
    process.exit(0); // ✅ Success
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    await disconnectDB();
    process.exit(1); // ❌ Failure
  }
};

seed();
