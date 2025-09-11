// src/dtos/bookmark.request.dto.ts
import Joi from "joi";

export interface GetActiveBookmarks{ 
    searchQuery?:string
}

export const GetActiveBookmarksSchema = Joi.object({
  searchQuery: Joi.string().optional().allow(""),
});
