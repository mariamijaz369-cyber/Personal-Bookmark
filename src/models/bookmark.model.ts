// src/models/bookmark.model.ts
 import { Schema, model, Types } from "mongoose";

export interface IBookmark {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  url: string;
  title: string;
  notes?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const bookmarkSchema = new Schema<IBookmark>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    notes: { type: String, default: "" },
    tags: [{ type: String }], // Array of strings for tags
    deletedAt: { type: Date, default: null }, // Soft delete support
  },
  { timestamps: true }
);
// Indexes for faster searching by title, notes, or tags
bookmarkSchema.index({ title: "text", notes: "text", tags: "text" });
 export const Bookmark = model<IBookmark>("Bookmark", bookmarkSchema);
