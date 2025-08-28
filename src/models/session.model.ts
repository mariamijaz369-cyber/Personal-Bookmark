import mongoose, { Document, Schema } from "mongoose";

// 1. Define Session interface
export interface ISession {
    userId: string;
    token: string;
    loginTime: Date;
    logoutTime?: Date;
    expiresAt: Date;
}

// 2. Create Mongoose Schema
const SessionSchema = new Schema<ISession>({
    userId: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    loginTime: { type: Date, default: Date.now },
    logoutTime: { type: Date },
    expiresAt: { type: Date, required: true }
});

export const Session = mongoose.model<ISession>("Session", SessionSchema);
