import mongoose, { Document, Schema } from "mongoose";

// ✅ TypeScript interface
export interface IBookmarkVisit extends Document {
  userId: mongoose.Types.ObjectId;     // Reference to the user
  bookmarkId: mongoose.Types.ObjectId; // Reference to the bookmark
  visitCount: number;                  // Number of times the user visited this bookmark
  lastVisitedAt?: Date;                // Last visit timestamp
}

// ✅ Schema definition
const BookmarkVisitSchema: Schema<IBookmarkVisit> = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookmarkId: { type: mongoose.Schema.Types.ObjectId, ref: "Bookmark", required: true },
    visitCount: { type: Number, default: 0 },
    lastVisitedAt: { type: Date },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// ✅ Static method to get the most visited bookmark for a user
BookmarkVisitSchema.statics.getMostVisitedUrl = async function(userId: string) {
  const userObjId = new mongoose.Types.ObjectId(userId);

  const result = await this.findOne({ userId: userObjId })
    .populate("bookmarkId", "title url") // populate bookmark details
    .sort({ visitCount: -1 })            // highest visit count first
    .exec();

  return result; // returns the document with highest visitCount
};

// ✅ Create the model with static type
interface BookmarkVisitModel extends mongoose.Model<IBookmarkVisit> {
  getMostVisitedUrl(userId: string): Promise<IBookmarkVisit | null>;
}

const BookmarkVisit = mongoose.model<IBookmarkVisit, BookmarkVisitModel>(
  "BookmarkVisit",
  BookmarkVisitSchema
);

// ✅ Export the model
export default BookmarkVisit;
