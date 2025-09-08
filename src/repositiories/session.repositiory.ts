// src/repositories/session.repository.ts
import { Session, ISession } from "../models/session.model"
import { Types } from "mongoose";

export class SessionRepository {
async create(sessionData: { userId: string; token: string; createdAt: Date; expiresAt: Date; }): Promise<ISession> {
  const session = await Session.create(sessionData);
  return session.toObject();
}

  /**
   * Find a session by token
   */
  async findByToken(token: string): Promise<ISession | null> {
    return Session.findOne({ token });
  }

  /**
   * Invalidate (logout) a session by token
   */
  async logout(token: string): Promise<ISession | null> {
    return Session.findOneAndUpdate(
      { token },
      { $set: { logoutAt: new Date(),expiresAt : new Date()} },
      { new: true }
    );
  }

  /**
   * Delete expired sessions
   */
  async deleteExpired(): Promise<number> {
    const result = await Session.deleteMany({
      expiresAt: { $lte: new Date() },
    });
    return result.deletedCount || 0;
  }

//   /**
//    * Delete all sessions for a user (useful on password change)
//    */
  async deleteAllByUser(userId: Types.ObjectId): Promise<number> {
    const result = await Session.deleteMany({ userId });
    return result.deletedCount || 0;
  }
}

// Export a singleton instance
export const sessionRepository = new SessionRepository();


 export const createSession = async (userId: string) => {
  const session = new Session({
    userId,
    token: "somerandomtoken",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  });

  return await session.save();
};

