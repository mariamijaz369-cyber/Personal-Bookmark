// src/models/user.model.ts
import mongoose, { Document, Schema } from "mongoose";

// 1️⃣ Interface (TypeScript structure for a User)
export interface IUser {
  name: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  createdAt: Date;
}

// 2️⃣ User Schema (how it will be stored in MongoDB)
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

// 3️⃣ Export User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
