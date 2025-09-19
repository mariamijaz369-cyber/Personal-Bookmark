import { BookmarkVisitRepository } from "../repositiories/visit.repo";
import BookmarkVisit, { IBookmarkVisit } from "../models/visit.model";
import { NextFunction } from "express";
import { Bookmark } from "../models/bookmark.model";
export class BookmarkVisitService {
  private visitRepository: BookmarkVisitRepository;

  constructor() {
    this.visitRepository = new BookmarkVisitRepository();
  }
 async trackVisit(userId: string, bookmarkId: string): Promise<IBookmarkVisit> {
    const bookmark = await Bookmark.findById(bookmarkId);
    if (!bookmark) {
      const error = new Error("Bookmark not found");
      (error as any).statusCode = 404; 
      throw error;
    }

    const visit = await this.visitRepository.trackVisit(userId, bookmarkId);

    if (!visit) {
      const error = new Error("Failed to track visit");
      (error as any).statusCode = 500;
      throw error;
    }

    return visit;
  }
  async getVisitStats(userId: string, bookmarkId: string): Promise<number> {
    const visit = await BookmarkVisit.findOne({ userId, bookmarkId });
    return visit ? visit.visitCount : 0;
  }
  async getAllVisits(): Promise<IBookmarkVisit[]> {
    return await BookmarkVisit.find().populate("bookmarkId");
  }
  async getMostVisitedUrl(userId: string): Promise<IBookmarkVisit | null> {
    return await BookmarkVisit.findOne({ userId })
      .sort({ visitCount: -1 })
      .populate("bookmarkId");
  }
async fetchMostFavoriteUrls(userId: string) {
    try {
      const result = await getMostFavoriteUrls(userId);

      return {
        code: 200,
        success: true,
        message: "Most clicked, most visited, and most favorite URLs fetched successfully",
        data: result
      };
    } catch (error: any) {
      console.error("Error in StatsService:", error.message);
      return {
        code: 500,
        success: false,
        message: "Internal server error while fetching favorite URLs",
        data: null,
      };
    }
  }
}
function getMostFavoriteUrls(userId: string) {
  throw new Error("Function not implemented.");
}