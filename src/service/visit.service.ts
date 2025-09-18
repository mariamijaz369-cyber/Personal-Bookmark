import { BookmarkVisitRepository } from "../repositiories/visit.repo";
import { IBookmarkVisit } from "../models/visit.model";

export class BookmarkVisitService {
  private visitRepository: BookmarkVisitRepository;

  constructor() {
    this.visitRepository = new BookmarkVisitRepository();
  }

  /**
   * 🔹 Track a visit (userId comes from token, bookmarkId from request param)
   */
  async trackVisit(userId: string, bookmarkId: string): Promise<IBookmarkVisit> {
    return await this.visitRepository.trackVisit(userId, bookmarkId);
  }

  /**
   * 🔹 Get total visit stats for a bookmark (userId comes from token)
   */
  async getVisitStats(userId: string, bookmarkId: string): Promise<number> {
    return await this.visitRepository.getVisitStats(userId, bookmarkId);
  }

  /**
   * 🔹 Get all visit records (for admin/analytics)
   */
  async getAllVisits(): Promise<IBookmarkVisit[]> {
    return await this.visitRepository.getAllVisits();
  }
  async getMostVisitedUrl(userId: string): Promise<IBookmarkVisit | null> {
    console.log(userId)
    return await this.visitRepository.getMostVisitedUrl(userId);
  }
  async fetchMostFavoriteUrls(userId: string) {
    try {
      const result = await getMostFavoriteUrls(userId);

      return {
        code: 200,
        success: true,
        message: "Most clicked, most visited, and most favorite URLs fetched successfully",
        data: result, // repo already gives { mostClickedUrl, mostVisitedUrl, mostFavoriteUrl }
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

