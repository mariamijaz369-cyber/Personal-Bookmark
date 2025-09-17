import Click, { IClick } from "../models/click.model";
import mongoose from "mongoose";

export class ClickRepository {
  /**
   * 🔹 Track a click for a user on a bookmark
   */
  async trackClick(userId: string, bookmarkId: string, url: string): Promise<IClick> {
    return await Click.findOneAndUpdate(
      { 
        userId: new mongoose.Types.ObjectId(userId), 
        bookmarkId: new mongoose.Types.ObjectId(bookmarkId) 
      },
      {
        $inc: { clickCount: 1 },                   // Increase click count
        $set: { lastClickedAt: new Date(), url },  // Update last clicked date + url
      },
      { new: true, upsert: true } // Create new if doesn't exist
    ).exec();
  }

  /**
   * 🔹 Get click stats for a user on a specific bookmark
   */
  async getClickStats(userId: string, bookmarkId: string): Promise<IClick | null> {
    return await Click.findOne({ 
      userId: new mongoose.Types.ObjectId(userId), 
      bookmarkId: new mongoose.Types.ObjectId(bookmarkId) 
    }).exec();
  }

  /**
   * 🔹 Get all click records (for analytics/admin)
   */
  async getAllClicks(): Promise<IClick[]> {
    return await Click.find()
      .populate("userId", "name email")        // show which user clicked
      .populate("bookmarkId", "title url");    // show bookmark details
  }
}
