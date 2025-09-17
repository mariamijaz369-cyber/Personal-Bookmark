// src/repositories/visit.repo.ts
import mongoose from "mongoose";
import BookmarkVisit, { IBookmarkVisit } from "../models/visit.model";

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
}
