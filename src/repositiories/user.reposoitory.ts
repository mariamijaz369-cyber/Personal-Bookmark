// src/repositories/user.repository.ts
import User, {IUser } from "../models/user.model";
import { Types } from "mongoose";
export async function findUserById(userId: Types.ObjectId): Promise<IUser | null> {
  return User.findById(userId);
}
export class UserRepository {
  /**
   * Create a new user
   */
  async createUser(name: string, email: string, password: string): Promise<IUser> {
    const user = await User.create({ name, email, password });
    return user.toObject();
  }
  /**
   * Find a user by ID
   */
  async findById(userId: Types.ObjectId): Promise<IUser | null> {
    return User.findById(userId); 
  }

  /**
   * Find a user by email
   */
  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  /**
   * Update a user’s details
   */
  async updateUser(userId: Types.ObjectId, updates: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(userId, updates, { new: true });
  }

  /**
   * Soft delete a user (set deletedAt instead of removing)
   */
  async softDeleteUser(userId: Types.ObjectId): Promise<IUser | null> {
    return User.findByIdAndUpdate(
      userId,
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
  }

  /**
   * Permanently delete a user
   */
  async deleteUser(userId: Types.ObjectId): Promise<boolean> {
    const result = await User.deleteOne({ _id: userId });
    return result.deletedCount === 1;
  }

  /**
   * Get all active users (not soft-deleted)
   */
  async getAllActiveUsers(): Promise<IUser[]> {
    return User.find({ deletedAt: null });
  }
}

// Export singleton instance
export const userRepository = new UserRepository();




export const findUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

export const createUser = async (userData: Partial<IUser>) => {
  const newUser = new User(userData);
  return await newUser.save();
};
