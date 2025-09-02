import bcrypt from "bcrypt";
import crypto from "crypto";
import { findUserByEmail, createUser } from "../repositiories/user.reposoitory";
import { ISession, Session } from "../models/session.model";
import { IUser } from "../models/user.model";
import { SessionRepository } from "../repositiories/session.repositiory";
export class AuthService {
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
    createSession(arg0: string) {
        throw new Error("Method not implemented.");
    }
//login
 public async loginUser(email: string, password: string) {
    // 1️⃣ Check inputs
    if (!email || !password) {
      throw new Error("❌ Email and password are required");
    }

    // 2️⃣ Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("❌ Invalid email or password");
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("❌ Invalid email or password");
    }

    // 4️⃣ Create session
    const session = await this.createSession(user._id.toString());

    return { user, session };
  } 
    public async logoutUser(token: string) {
    if (!token) {
      throw new Error("❌ Token is required");
    }

    // Find session in memory
    // const session = this.sessions.find((s: { token: string; }) => s.token === token);
 const session =await this.sessionRepo.findByToken(token);

    if (!session) {
      throw new Error("❌ Invalid token");
    }
    // return session; // no DB, just return updated object
    await this.sessionRepo.logout(token);

  }
}

