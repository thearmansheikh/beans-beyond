import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export interface AuthRequest extends Request {
  user?: { _id: string; role: string };
}

export async function protect(
  req: AuthRequest, res: Response, next: NextFunction
): Promise<void> {
  const token =
    req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Not authorised — no token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string; role: string;
    };
    req.user = { _id: decoded.id, role: decoded.role };
    next();
  } catch {
    res.status(401).json({ message: "Not authorised — invalid token" });
  }
}

export function adminOnly(
  req: AuthRequest, res: Response, next: NextFunction
): void {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Admin access required" });
    return;
  }
  next();
}
