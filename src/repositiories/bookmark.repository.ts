import { Bookmark, IBookmark } from "../models/bookmark.model";
import { FilterQuery, Types } from "mongoose"
/**
 * Find bookmark by user and URL
 */
export async function findBookmarkByUserAndUrl(
  userId: Types.ObjectId,
  url: string
): Promise<IBookmark | null> {
  return Bookmark.findOne({ userId, url, deletedAt: null });
}

/**
 * Bookmark Repository (single definition)
 */
export class BookmarkRepository {
 
  /**
   * Create a new bookmark
   */
  async createBookmark(
    userId: Types.ObjectId,
    url: string,
    title: string,
    tags: string[],
    notes?: string,
  ): Promise<IBookmark> {
    const bookmark = await Bookmark.create({
      userId,
      url,
      title,
      notes,
      tags,
    });
    return bookmark.toObject();
  }

  /**
   * Find all bookmarks for a user
   */
  async findByUser(userId: Types.ObjectId): Promise<IBookmark[]> {
    return Bookmark.find({ userId, deletedAt: null });
  }

  /**
   * Find a single bookmark by ID
   */
  async findById(bookmarkId: Types.ObjectId): Promise<IBookmark | null> {
    return Bookmark.findById(bookmarkId);
  }

  /**
   * Update a bookmark
   */
  async updateBookmark(
    bookmarkId: Types.ObjectId,
    updates: Partial<IBookmark>
  ): Promise<IBookmark | null> {
    return Bookmark.findByIdAndUpdate(bookmarkId, updates, { new: true });
  }

  /**
   * Soft delete a bookmark
   */
  async softDeleteBookmark(bookmarkId: Types.ObjectId): Promise<IBookmark | null> {
    return Bookmark.findByIdAndUpdate(
      bookmarkId,
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
  }

  /**
   * Permanently delete a bookmark
   */
  async deleteBookmark(bookmarkId: Types.ObjectId, isSoftDelete: boolean = true): Promise<IBookmark | null> {
    if (isSoftDelete) {
      // Soft delete → mark as deleted instead of removing
      return Bookmark.findByIdAndUpdate(
        bookmarkId,
        { $set: { isDeleted: true } },
        { new: true }
      );
    } else {
      // Hard delete → remove completely
      return Bookmark.findByIdAndDelete(bookmarkId);
    }
  }

  /**
   * Search bookmarks by text (title, notes, tags)
   */
  async searchBookmarks(userId: Types.ObjectId, query: string): Promise<IBookmark[]> {
    return Bookmark.find({
      userId,
      deletedAt: null,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { notes: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ],
    });
  }

  /**
   * Filter bookmarks by tag
   */
  async findByTag(userId: Types.ObjectId, tag: string): Promise<IBookmark[]> {
    return Bookmark.find({
      userId,
      tags: tag,
      deletedAt: null,
    });
  }
  // getactivebookmark
   async GetActiveBookmark(userId: string, searchQuery: string = "", tags: string="",cursor?: string, limit = 10) {
    // Base filter
    const filter: FilterQuery<typeof Bookmark> = {
      userId,
      $or: [{ deletedAt: null }, { deletedAt: { $exists: false } }],
    };

    // 🔎 Apply search query if exists
    if (searchQuery.trim().length > 0) {
      const words = searchQuery.trim().split(/\s+/).map(this.escapeRegex);
      const pattern = words.join("|");
      filter.title = { $regex: pattern, $options: "i" };
    }

    // 🏷️ Apply tags filter if tags exist
    if (tags) {
      filter.tags = { $all: tags }; 
      // $all → ensures that all given tags must be present in the bookmark
    }
    
  // ⏩ Apply cursor (pagination)
  if (cursor) {
    filter.createdAt = { $lt: new Date(cursor) }; 
    // $lt = get bookmarks older than the cursor date
  }

  // Fetch Bookmarks
  const bookmarks = await Bookmark.find(
    filter,
    { title: 1, url: 1, tags: 1, notes: 1, createdAt: 1 }
  )
    .sort({ _id: -1 }) // 👉 use _id for consistent ordering
    .limit(limit + 1); // fetch 1 extra to check if more exist
// 🔑 Check if there's a next page
  const hasNextPage = bookmarks.length > limit;

  // remove the extra record if exists
  if (hasNextPage) {
    bookmarks.pop();
  }

  // 📌 Next cursor = createdAt of last item
  const nextCursor = bookmarks.length > 0
    ? bookmarks[bookmarks.length - 1].createdAt.toISOString()
    : null;

  return {
    bookmarks,
    nextCursor,
    hasNextPage,
  };
}

// Helper to escape regex special chars
private escapeRegex(w: string): string {
  return w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
}