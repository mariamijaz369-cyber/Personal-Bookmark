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
const ClickSchema: Schema<IClick> = new Schema(
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

// ✅ Static method to get the most clicked URL for a user
ClickSchema.statics.getMostClickedUrl = async function(userId: string) {
  const userObjId = new mongoose.Types.ObjectId(userId);

  const result = await this.findOne({ userId: userObjId })
    .sort({ clickCount: -1 }) // sort by clickCount descending
    .exec();

  return result; // returns the document with the highest clickCount
};

// ✅ Create the model
interface ClickModel extends mongoose.Model<IClick> {
  getMostClickedUrl(userId: string): Promise<IClick | null>;
}

const Click = mongoose.model<IClick, ClickModel>("Click", ClickSchema);

// ✅ Export the model
export default Click;


