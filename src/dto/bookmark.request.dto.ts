// src/dtos/bookmark.request.dto.ts
// import Joi from "joi";

// export interface GetActiveBookmarks { 
//   searchQuery?: string;
//   tags?: string;   // ✅ tags should be an array of strings
// }

// export const GetActiveBookmarksSchema = Joi.object({
//   searchQuery: Joi.string().optional().allow(""),
//   tags: Joi.string().optional().allow(""), // ✅ validate tags as array of strings
// });
import Joi from "joi";

export interface GetActiveBookmarksRequest { 
  searchQuery?: string;
  tags?: string;   // ✅ still string (comma-separated if you want multiple)
  page?: number;   // ✅ pagination page, default = 1
  limit?: number;  // ✅ pagination limit, default = 10
}

export const GetActiveBookmarksSchema = Joi.object({
  searchQuery: Joi.string().optional().allow(""),
  tags: Joi.string().optional().allow(""), // e.g. "work,study"

  // ✅ pagination
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});
