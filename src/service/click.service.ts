import { ClickRepository } from "../repositiories/click.repo";
import { IClick } from "../models/click.model";
import { url } from "inspector";
import { Bookmark } from "../models/bookmark.model";

export class ClickService {
private clickRepository: ClickRepository;

  constructor() {
    this.clickRepository = new ClickRepository();
  }
   async trackClick(userId: string, bookmarkId: string): Promise<IClick> {
    // ✅ Check if bookmark exists
    const bookmark = await Bookmark.findById(bookmarkId);
    if (!bookmark) {
      const error = new Error("Bookmark not found");
      (error as any).statusCode = 404;
      throw error;
    }
    // ✅ Bookmark exists → track click
    return await this.clickRepository.trackClick(userId, bookmarkId);
  }

  //  * 🔹 Get click stats for a user on a single bookmark
   
  async getClickStats(userId: string, bookmarkId: string): Promise<IClick | null> {
    return await this.clickRepository.getClickStats(userId, bookmarkId);
  }

  
  //  * 🔹 Get stats for all bookmarks (for analytics dashboards/admin)
   
  async getAllClicks(): Promise<IClick[]> {
    return await this.clickRepository.getAllClicks();
  }
  async getMostClickedUrl(userId: string): Promise<IClick | null> {
    console.log(userId)
    return await this.clickRepository.getMostClickedUrl(userId);
  }
}