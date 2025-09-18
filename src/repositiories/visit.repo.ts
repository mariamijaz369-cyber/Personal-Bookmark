// src/repositories/visit.repo.ts
import mongoose from "mongoose";
import BookmarkVisit, { IBookmarkVisit } from "../models/visit.model";
import Click from "../models/click.model";

export class BookmarkVisitRepository {
  /**
   * 🔹 Track a visit for a user (userId comes from token, not client)
   */
  async trackVisit(userId: string, bookmarkId: string): Promise<IBookmarkVisit> {
    const userObjId = new mongoose.Types.ObjectId(userId);   // from token
    const bookmarkObjId = new mongoose.Types.ObjectId(bookmarkId);

    const visit = await BookmarkVisit.findOneAndUpdate(
      { userId: userObjId, bookmarkId: bookmarkObjId }, 
      {
        $inc: { visitCount: 1 },
        $set: { lastVisitedAt: new Date() },
      },
      { new: true, upsert: true }
    ).exec();

    return visit!;
  }

  /**
   * 🔹 Get total visits for a user on a bookmark
   */
  async getVisitStats(userId: string, bookmarkId: string): Promise<number> {
    const visit = await BookmarkVisit.findOne({
      userId: new mongoose.Types.ObjectId(userId),   // from token
      bookmarkId: new mongoose.Types.ObjectId(bookmarkId),
    }).exec();

    return visit?.visitCount ?? 0;
  }

  /**
   * 🔹 Get all visit records (for admin/analytics)
   */
  async getAllVisits(): Promise<IBookmarkVisit[]> {
    return await BookmarkVisit.find()
      .populate("userId", "name email")
      .populate("bookmarkId", "title url")
      .exec();
  }
  async getMostVisitedUrl(userId: string): Promise<IBookmarkVisit | null> {
    const userObjId = new mongoose.Types.ObjectId(userId);

    const result = await BookmarkVisit.findOne({ userId: userObjId })
      .populate("bookmarkId", "title url")   // populate bookmark details
      .sort({ visitCount: -1 })              // highest visit count first
      .limit(1)
      .exec();

    return result; // returns the most visited bookmark doc
  }
}
//  async  getMostFavoriteUrls(userId: string) {
//   const userObjId = new mongoose.Types.ObjectId(userId);

//   // 1️⃣ Most clicked URL
//   const mostClickedDoc = await Click.findOne({ userId: userObjId })
//     .sort({ clickCount: -1 })
//     .populate("bookmarkId", "title url")
//     .lean();

//   const mostClicked = mostClickedDoc
//     ? { bookmarkId: mostClickedDoc.bookmarkId, clickCount: mostClickedDoc.clickCount }
//     : null;

//   // 2️⃣ Most visited URL
//   const mostVisitedDoc = await BookmarkVisit.findOne({ userId: userObjId })
//     .sort({ visitCount: -1 })
//     .populate("bookmarkId", "title url")
//     .lean();

//   const mostVisited = mostVisitedDoc
//     ? { bookmarkId: mostVisitedDoc.bookmarkId, visitCount: mostVisitedDoc.visitCount }
//     : null;

//   // 3️⃣ Compute favorite scores
//   const scoreMap: Record<string, number> = {};
//   if (mostClicked) scoreMap[mostClicked.bookmarkId._id] = mostClicked.clickCount;
//   if (mostVisited) {
//     scoreMap[mostVisited.bookmarkId._id] =
//       (scoreMap[mostVisited.bookmarkId._id] || 0) + mostVisited.visitCount;
//   }

//   // 4️⃣ Determine the bookmark with the highest score
//   let maxBookmarkId: string | null = null;
//   let maxScore = 0;
//   for (const [bookmarkId, score] of Object.entries(scoreMap)) {
//     if (score > maxScore) {
//       maxScore = score;
//       maxBookmarkId = bookmarkId;
//     }
//   }

//   // 5️⃣ Update MostFavoriteUrl collection
//   let mostFavorite = null;
//   if (maxBookmarkId) {
//     const doc = await mostFavorite.findOneAndUpdate(
//       { userId: userObjId, bookmarkId: maxBookmarkId },
//       { favoriteScore: maxScore, lastUpdatedAt: new Date() },
//       { upsert: true, new: true }
//     ).populate("bookmarkId", "title url");

//     if (doc && doc.bookmarkId) {
//       mostFavorite = { bookmarkId: doc.bookmarkId, favoriteScore: doc.favoriteScore };
//     }
//   }
//  }
// }