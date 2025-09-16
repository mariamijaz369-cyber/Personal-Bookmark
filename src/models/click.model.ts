// src/models/click.model.ts
import mongoose, { Document, Schema } from "mongoose";

// ✅ Interface must be exported
export interface IClick extends Document {
  bookmarkId: mongoose.Types.ObjectId;
  url: string;
  clickCount: number;
  lastClickedAt?: Date;
}

// ✅ Model must also be exported (default export is fine)
const ClickSchema: Schema = new Schema(
  {
    bookmarkId: { type: mongoose.Schema.Types.ObjectId, ref: "Bookmark", required: true },
    url: { type: String, required: true },
    clickCount: { type: Number, default: 0 },
    lastClickedAt: { type: Date },
  },
  { timestamps: true }
);

const Click = mongoose.model<IClick>("Click", ClickSchema);

// ✅ Make sure you export the model
export default Click;
