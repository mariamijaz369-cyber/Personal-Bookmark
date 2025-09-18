import mongoose, { Document, Schema } from "mongoose";

export interface IMostFavoriteUrl extends Document {
  userId: mongoose.Types.ObjectId;      // Reference to User
  bookmarkId: mongoose.Types.ObjectId;  // Reference to Bookmark
  favoriteScore: number;                // Combined score (clicks + visits)
  lastUpdatedAt: Date;                  // Last time updated
}

const MostFavoriteUrlSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookmarkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookmark",
      required: true,
    },
    favoriteScore: {
      type: Number,
      required: true,
      default: 0,
    },
    lastUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const MostFavoriteUrl = mongoose.model<IMostFavoriteUrl>(
  "MostFavoriteUrl",
  MostFavoriteUrlSchema
);

export default MostFavoriteUrl;
