import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(id: string, role: string): string {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? "7d" }
  );
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      res.status(400).json({ message: "Email already registered" });
      return;
    }
    const user = await User.create({ name, email, password, phone });
    const token = signToken(user._id.toString(), user.role);
    res.status(201).json({ success: true, token, user });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const token = signToken(user._id.toString(), user.role);
    res.json({ success: true, token, user });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
}

export async function getMe(req: Request & { user?: { _id: string } }, res: Response): Promise<void> {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) { res.status(404).json({ message: "User not found" }); return; }
    res.json({ success: true, user });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
}
