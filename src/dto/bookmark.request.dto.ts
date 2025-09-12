// src/dtos/bookmark.request.dto.ts
import Joi from "joi";

export interface GetActiveBookmarks { 
  searchQuery?: string;
  tags?: string;   // ✅ tags should be an array of strings
}

export const GetActiveBookmarksSchema = Joi.object({
  searchQuery: Joi.string().optional().allow(""),
  tags: Joi.string().optional().allow(""), // ✅ validate tags as array of strings
});
