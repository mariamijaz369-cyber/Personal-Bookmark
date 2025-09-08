
import { Types } from "mongoose";
import { IBookmark } from "../models/bookmark.model";
import { findUserById } from "../repositiories/user.reposoitory";
import { bookmarkRepository } from "../repositiories/bookmark.repository"; // ✅ import the instance

export class BookmarkService {
  /**
   * Business function: Create a new bookmark
   */
  public async  createBookmark(data: {
    userId: Types.ObjectId;
    url: string;
    title: string;
    tags: string[];
    notes?: string;
  }): Promise<IBookmark> {
    const { userId, url, title, tags, notes } = data;

    // ✅ 1. Check if user exists
    const userExists = await findUserById(userId);
    if (!userExists) {
      throw new Error("User not found");
    }

    // ✅ 2. Validate URL format (business rule)
    if (!/^https?:\/\//.test(url)) {
      throw new Error("Invalid URL format. URL must start with http:// or https://");
    }

    // ✅ 3. Call repository function
    return await bookmarkRepository.createBookmark(userId, url, title, tags, notes);
  }
}

//  updateBookmark
 export class BookmarkBusinessService {
  async updateBookmark(bookmarkId: string, updateData: Partial<{ url: string; title: string; notes: string; tags: string[] }>) {
    // ✅ 1. Validate Bookmark ID
    if (!bookmarkId || typeof bookmarkId !== "string") {
      throw new Error("Invalid Bookmark ID");
    }

    // ✅ 2. Check if bookmark exists (business logic step - handled in DB layer)
    // Here, we just assume a function like: const bookmark = findBookmarkById(bookmarkId);
    
   const bookmark: Record<string, any> = {}; // empty object


    // ✅ 3. Validate updateData fields
   

    if (updateData.url && !updateData.url.startsWith("http")) {
      throw new Error("Invalid URL. It must start with http or https");
    }

    if (updateData.title !== undefined && updateData.title.trim() === "") {
      throw new Error("Title cannot be empty");
    }

    // ✅ 4. Apply default values
    const finalNotes = updateData.notes && updateData.notes.trim() !== "" ? updateData.notes : bookmark.notes;
    const finalTags = updateData.tags && updateData.tags.length > 0 ? updateData.tags : bookmark.tags;

    // ✅ 5. Merge updates
     const updatedBookmark = {
      ...bookmark,
      ...updateData,
      notes: finalNotes,
      tags: finalTags,
      updatedAt: new Date() // Business rule: update timestamp
    };

    // ✅ 6. Return updated bookmark (DB save happens elsewhere)
    return updatedBookmark;
  }
}

// delete

export function deleteBookmarkBusinessLogic(
  bookmark: { isDeleted?: boolean; [key: string]: any } | null,
  isSoftDelete: boolean = true
) {
  if (!bookmark) {
    throw new Error("Bookmark not found");
  }

  let updatedBookmark;

  if (isSoftDelete) {
    // ✅ Soft delete → mark as deleted
    updatedBookmark = { ...bookmark, isDeleted: true };
    return {
      message: "Bookmark soft deleted successfully",
      updatedBookmark,
    };
  } else {
    // ✅ Hard delete → simulate complete removal
    updatedBookmark = null;
    return {
      message: "Bookmark permanently deleted",
      updatedBookmark,
    };
  }
}

