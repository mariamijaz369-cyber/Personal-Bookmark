
import BookmarkVisit, { IBookmarkVisit } from "../models/visit.model";
import mongoose from "mongoose";

export class BookmarkVisitRepository {
  /**
   * Track a visit (create or update)
   */
  async trackVisit(userId: string, bookmarkId: string): Promise<IBookmarkVisit> {
    const visit = await BookmarkVisit.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(userId), bookmarkId: new mongoose.Types.ObjectId(bookmarkId) },
      { $inc: { visitCount: 1 }, $set: { lastVisitedAt: new Date() } },
      { new: true, upsert: true }
    );
    return visit;
  }

  /**
   * Get visit stats for a single bookmark
   */
  async getVisitStats(userId: string, bookmarkId: string): Promise<number> {
    const visit = await BookmarkVisit.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      bookmarkId: new mongoose.Types.ObjectId(bookmarkId),
    });

    return visit ? visit.visitCount : 0;
  }


  /**
   * Get all visits (for admin/analytics)
   */
  async getAllVisits(): Promise<IBookmarkVisit[]> {
    return await BookmarkVisit.find().sort({ lastVisitedAt: -1 });
  }

  /**
   * Get most visited bookmark for a user
   */
  async getMostVisitedUrl(userId: string): Promise<IBookmarkVisit | null> {
    return await BookmarkVisit.findOne({ userId: new mongoose.Types.ObjectId(userId) })
      .sort({ visitCount: -1 }) // most visits first
      .populate("bookmarkId"); // optional: fetch bookmark details
  }
}
