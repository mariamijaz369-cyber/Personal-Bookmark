import { ClickRepository } from "../repositiories/click.repo";
import { IClick } from "../models/click.model";
import { url } from "inspector";

export class ClickService {
  static getMostClickedUrl(userId: string) {
    throw new Error("Method not implemented.");
  }
  private clickRepository: ClickRepository;

  constructor() {
    this.clickRepository = new ClickRepository();
  }

  /**
   * 🔹 Track a click for a specific user on a bookmark
   */
  async trackClick(userId: string, bookmarkId: string, url: string): Promise<IClick> {
    return await this.clickRepository.trackClick(userId, bookmarkId,url);
  }

  /**
   * 🔹 Get click stats for a user on a single bookmark
   */
  async getClickStats(userId: string, bookmarkId: string): Promise<IClick | null> {
    return await this.clickRepository.getClickStats(userId, bookmarkId);
  }

  /**
   * 🔹 Get stats for all bookmarks (for analytics dashboards/admin)
   */
  async getAllClicks(): Promise<IClick[]> {
    return await this.clickRepository.getAllClicks();
  }
  async getMostClickedUrl(userId: string): Promise<IClick | null> {
    console.log(userId)
    return await this.clickRepository.getMostClickedUrl(userId);
  }
}
