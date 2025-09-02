import bcrypt from "bcrypt";
import crypto from "crypto";
import { findUserByEmail, createUser } from "../repositiories/user.reposoitory";
import { Session } from "../models/session.model";
export class AuthService {

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
    // 1️⃣ Find session by token
    const session = await Session.findOne({ token });

    if (!session) {
      throw new Error("❌ Invalid token");
    }

    // 2️⃣ Mark session as logged out
    // session.set("logoutAt", new Date());
    session.logoutAt=new Date();
    session.expiresAt = new Date(); 
    await session.save();
return
    // return { message: "✅ Logged out successfully" };
  }

  // 🟢 Create a new session
  private async createSession(userId: string) {
    const token = crypto.randomBytes(32).toString("hex"); // secure token
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    const session = new Session({
      userId,
      token,
      loginTime: new Date(),
      expiresAt,
      logoutAt:null
    });

    await session.save();
    return { token, expiresAt };
  }
}
