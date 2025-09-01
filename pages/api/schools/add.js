// pages/api/schools/add.js
import { connectDB } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, address, city, state, contact, email_id, image } = req.body;

    // Validate required fields
    if (!name || !address || !city || !state || !contact || !email_id || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Optional: validate image URL format
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp))$/i;
    if (!urlPattern.test(image)) {
      return res.status(400).json({ error: "Invalid image URL" });
    }

    // Connect to database
    const db = await connectDB();
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, image, email_id]
    );

    return res.status(200).json({ message: "School added successfully!" });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
