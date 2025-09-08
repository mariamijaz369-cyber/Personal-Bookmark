import bcrypt from "bcrypt";
import crypto from "crypto";
import { findUserByEmail, createUser } from "../repositiories/user.reposoitory";
import { ISession, Session } from "../models/session.model";
import { IUser } from "../models/user.model";
import { SessionRepository } from "../repositiories/session.repositiory";
export class AuthService {
  logoutUser(token: any) {
    throw new Error("Method not implemented.");
  }
    sessionRepo: SessionRepository;
    sessions: any;
constructor(){ 
    this.sessionRepo=new SessionRepository()
}
  // 🟢 Register a new user
  public async registerUser(
    name: string,
    email: string,
    password: string,
    dateOfBirth: Date
  ) {
    // 1️⃣ Check if email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user in DB
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

   // 4️⃣ Create session
  const session = await this.createSession(newUser._id.toString());

    return { newUser, session };
  }
public async createSession(userId: string): Promise<ISession> {
  const token = crypto.randomBytes(32).toString("hex");

  const sessionData = {
    userId,
    token,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
    logoutAt:null
  };

  // ✅ repo.create now returns ISession, not void
//   const session = this.sessionRepo.create(sessionData);
//   return session;
// }
const session = await this.sessionRepo.create(sessionData);
return session;
}
//login
public async loginUser(email: string, password: string) {
  // 1️⃣ Validate input
  if (!email || !password) {
    throw new Error("❌ Email and password are required");
  }

  // 2️⃣ Find user
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("❌ Invalid email or password");
  }

  // 3️⃣ Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("❌ Invalid email or password");
  }

  // 4️⃣ ✅ Create new session (don’t search by token here)
  const session = await this.createSession(user._id.toString());

  return { user, session };
}
}
