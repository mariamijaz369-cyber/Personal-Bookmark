import mongoose, { Document, Schema } from "mongoose";

// ✅ TypeScript interface
export interface IBookmarkVisit extends Document {
  userId: mongoose.Types.ObjectId;     // Reference to the user
  bookmarkId: mongoose.Types.ObjectId; // Reference to the bookmark
  visitCount: number;                  // Number of times the user visited this bookmark
  lastVisitedAt?: Date;                // Last visit timestamp
}

// ✅ Schema definition
const BookmarkVisitSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookmarkId: { type: mongoose.Schema.Types.ObjectId, ref: "Bookmark", required: true },
    visitCount: { type: Number, default: 0 },
    lastVisitedAt: { type: Date },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// ✅ Create the model
const BookmarkVisit = mongoose.model<IBookmarkVisit>("BookmarkVisit", BookmarkVisitSchema);

// ✅ Export the model
export default BookmarkVisit;
