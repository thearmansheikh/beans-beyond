import { Router, type Request, type Response } from "express";
import rateLimit from "express-rate-limit";

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: { message: "Too many contact requests, please try again later." },
});

router.post("/", contactLimiter, async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      res.status(400).json({ message: "name, email and message are required" });
      return;
    }
    // TODO: integrate SendGrid / Mailgun to actually send the email
    console.log("[Contact form]", { name, email, phone, subject, message });
    res.json({ success: true, message: "Message received. We'll be in touch soon!" });
  } catch (err: unknown) {
    res.status(500).json({ message: (err as Error).message });
  }
});

export default router;
