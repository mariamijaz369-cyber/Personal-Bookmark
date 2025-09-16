import { ClickRepository } from "../repositiories/click.repo";
import Click, { IClick } from "../models/click.model";


export class ClickService {
  private clickRepository: ClickRepository;

  constructor() {
    this.clickRepository = new ClickRepository();
  }

  /**
   * Track a click for a specific bookmark
   */
  async trackClick(bookmarkId: string, url: string): Promise<IClick> {
    return await this.clickRepository.trackClick(bookmarkId, url);
  }

  /**
   * Get stats for a single bookmark (total clicks, last clicked time, etc.)
   */
  async getClickStats(bookmarkId: string): Promise<IClick | null> {
    return await this.clickRepository.getClickStats(bookmarkId);
  }

  /**
   * Get stats for all bookmarks (for analytics dashboards/admin)
   */
  async getAllClicks(): Promise<IClick[]> {
    return await this.clickRepository.getAllClicks();
  }
}

