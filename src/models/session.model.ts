import mongoose, { Document, Schema } from "mongoose";

// 1. Define Session interface
export interface ISession {
    userId: string;
    token: string;
    loginTime: Date;
    logoutAt?: Date;
    expiresAt: Date;
}
const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  token: { type: String, required: true, unique: true, index: true }, // ✅ add index
  loginTime: Date,
  logoutAt: Date,
  expiresAt: Date,
});


export const Session = mongoose.model<ISession>("Session", sessionSchema);
