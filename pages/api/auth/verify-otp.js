import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ error: "Email and OTP required" });

  const db = await connectDB();
  const [rows] = await db.execute("SELECT * FROM otps WHERE email = ? AND otp = ?", [email, otp]);
  if (!rows.length) return res.status(400).json({ error: "Invalid OTP" });

  const expiresAt = new Date(rows[0].expires_at);
  if (expiresAt < new Date()) return res.status(400).json({ error: "OTP expired" });

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });

  res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=86400`);

  await db.execute("DELETE FROM otps WHERE email = ?", [email]);

  res.status(200).json({ message: "Authenticated" });
}