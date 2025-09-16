import { BookmarkVisitRepository } from "../repositiories/visit.repo";
import { IBookmarkVisit } from "../models/visit.model";

export class BookmarkVisitService {
  private bookmarkVisitRepository: BookmarkVisitRepository;

  constructor() {
    this.bookmarkVisitRepository = new BookmarkVisitRepository();
  }

  /**
   * 🔹 Track a visit for a user and bookmark
   */
  async trackVisit(userId: string, bookmarkId: string): Promise<IBookmarkVisit> {
    return await this.bookmarkVisitRepository.trackVisit(userId, bookmarkId);
  }

  /**
   * 🔹 Get total visits for a user on a bookmark
   */
  async getVisitStats(userId: string, bookmarkId: string): Promise<number> {
    return await this.bookmarkVisitRepository.getVisitStats(userId, bookmarkId);
  }

  /**
   * 🔹 Get all visit records (for admin or analytics dashboards)
   */
  async getAllVisits(): Promise<IBookmarkVisit[]> {
    return await this.bookmarkVisitRepository.getAllVisits();
  }
}
