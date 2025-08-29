import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model"; // your Mongoose User schema
import { Session } from "../models/session.model";
import crypto from "crypto";
import dotenv from "dotenv";



// Register new user
export const register = async (req: Request, res: Response,  next: NextFunction) => {
  try {
    const { name, email, password, dateOfBirth } = req.body;

    // 1️⃣ Check if all fields are provided
    if (!name || !email || !password || !dateOfBirth) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Check if email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // 3️⃣ Hash password (for security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Save user to MongoDB
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      dateOfBirth,
    });
    await newUser.save();
    const session=await createSession((newUser._id).toString())

    // 5️⃣ Send success response (never return raw password)
    res.status(201).json({
      message: "User registered successfully",
      token:session.token,
      expireAt:session.expiresAt,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        dateOfBirth: newUser.dateOfBirth,
      },
    });
  } catch(error) {
    next(error)
  }
}
// 4. Create Session on Login
async function createSession(userId: string) {
    const token = crypto.randomBytes(32).toString("hex"); // secure token
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiry

    const session = new Session({
        userId,
        token,
        loginTime: new Date(),
        expiresAt
    });

    await session.save();
    return { token, expiresAt };
}

// 5. Expire Session (Logout)
async function expireSession(token: string) {
    const session = await Session.findOne({ token });
    if (!session) throw new Error("Session not found");

    session.logoutAt = new Date();
    await session.save();
    return "Session expired successfully";
}


export async function loginUser(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password } = req.body;

    // check if email is provided
    if (!email || !password) {
      return res.status(400).json({ message: "❌ Email and password are required" });
    }

    // find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "❌ Invalid email or password" });
    }

    // check password using bcrypt.compare via model method
     const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "❌ Invalid email or password" });
    }
   const session=await createSession((user._id).toString())

    return res.json({
      message: "✅ Login successful",
      token:session.token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}  
//logout
 export async function logoutUser(req: Request, res: Response, next: NextFunction) {
  try {
    const  token = res.locals.token; // user must send token in body
    console.log("token ",token )
    // Find session in DB
    const session = await Session.findOne({ token });

    if (!session) {
      return res.status(401).json({ message: "❌ Invalid token" });
    }

    session.set("logoutAt", new Date());
    session.expiresAt = new Date();
    await session.save();

    return res.json({ message: "✅ Logged out successfully" });
  } catch(err){
    next(err)
  }
}