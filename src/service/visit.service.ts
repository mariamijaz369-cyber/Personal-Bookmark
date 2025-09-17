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
}
