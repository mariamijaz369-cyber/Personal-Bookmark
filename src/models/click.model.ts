// src/models/click.model.ts
import mongoose, { Document, Schema } from "mongoose";

// ✅ Interface must be exported
export interface IClick extends Document {
  userId: mongoose.Types.ObjectId;       // Reference to the User
  bookmarkId: mongoose.Types.ObjectId;   // Reference to the Bookmark
  url: string;
  clickCount: number;
  lastClickedAt?: Date;
}

// ✅ Schema with userId added
const ClickSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",         // Reference to User collection
      required: true,
    },
    bookmarkId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookmark",     // Reference to Bookmark collection
      required: true,
    },
    url: { type: String, required: true },
    clickCount: { type: Number, default: 0 },
    lastClickedAt: { type: Date },
  },
  { timestamps: true }
);

// ✅ Create the model
const Click = mongoose.model<IClick>("Click", ClickSchema);

// ✅ Export the model
export default Click;
