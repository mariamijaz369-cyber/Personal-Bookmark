import mongoose from "mongoose";
import BookmarkVisit, { IBookmarkVisit } from "../models/visit.model";

export class BookmarkVisitRepository {
  /**
   * 🔹 Track a visit for a user and bookmark
   * If the record exists, increment visitCount; otherwise, create a new record
   */
  async trackVisit(userId: string, bookmarkId: string): Promise<IBookmarkVisit> {
    const visit = await BookmarkVisit.findOneAndUpdate(
      {
        userId: new mongoose.Types.ObjectId(userId),
        bookmarkId: new mongoose.Types.ObjectId(bookmarkId),
      },
      {
        $inc: { visitCount: 1 },         // increment visit count
        $set: { lastVisitedAt: new Date() }, // update last visited timestamp
      },
      { new: true, upsert: true }       // create if not exists and return new doc
    ).exec();

    return visit;
  }

  /**
   * 🔹 Get total visits for a user on a bookmark
   */
  async getVisitStats(userId: string, bookmarkId: string): Promise<number> {
    const visit = await BookmarkVisit.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      bookmarkId: new mongoose.Types.ObjectId(bookmarkId),
    }).exec();

    return visit?.visitCount ?? 0; // return 0 if no record
  }

  /**
   * 🔹 Get all visit records (for admin/analytics)
   */
  async getAllVisits(): Promise<IBookmarkVisit[]> {
    return await BookmarkVisit.find()
      .populate("userId", "name email")       // optional: populate user info
      .populate("bookmarkId", "title url")   // optional: populate bookmark info
      .exec();
  }
}
