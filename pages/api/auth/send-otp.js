import nodemailer from "nodemailer";
import { connectDB } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

  const db = await connectDB();
  await db.execute("DELETE FROM otps WHERE email = ?", [email]); 
  await db.execute("INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)", [email, otp, expiresAt]);


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  });

  res.status(200).json({ message: "OTP sent" });
}