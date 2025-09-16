import Click, { IClick } from "../models/click.model";
import mongoose from "mongoose";

export class ClickRepository {
  async trackClick(bookmarkId: string, url: string): Promise<IClick> {
    return await Click.findOneAndUpdate(
      { bookmarkId: new mongoose.Types.ObjectId(bookmarkId) },
      {
        $inc: { clickCount: 1 },
        $set: { lastClickedAt: new Date(), url },
      },
      { new: true, upsert: true }
    );
  }

  async getClickStats(bookmarkId: string): Promise<IClick | null> {
    return await Click.findOne({ bookmarkId });
  }

  async getAllClicks(): Promise<IClick[]> {
    return await Click.find().populate("bookmarkId", "title url");
  }
}