import { Bookmark } from "../models/bookmark.model";
import { IUser } from "../models/user.model"; 
import { faker } from "@faker-js/faker";
import { Types } from "mongoose";

/**
 * Seeds fake bookmarks for given users
 * Each user will get random bookmarks with tags and notes
 */
export const seedBookmarks = async (users: IUser[]) => {
  console.log("🌱 Seeding Bookmarks...");

  const bookmarks = [];

  for (const user of users) {
    // each user gets 2–5 bookmarks
    const bookmarkCount = faker.number.int({ min: 2, max: 5 });

    for (let i = 0; i < bookmarkCount; i++) {
      bookmarks.push({
        userId: user._id as unknown as Types.ObjectId,
        url: faker.internet.url(),
        title: faker.lorem.words(3),
        notes: faker.lorem.sentence(),
        tags: faker.helpers.arrayElements(
          ["work", "personal", "learning", "coding", "reference", "important"],
          faker.number.int({ min: 1, max: 3 })
        ),
      });
    }
  }

  const createdBookmarks = await Bookmark.insertMany(bookmarks);
  console.log(`✅ Created ${createdBookmarks.length} bookmarks`);
  return createdBookmarks;
};
