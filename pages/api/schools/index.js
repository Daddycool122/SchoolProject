import { connectDB } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const db = await connectDB();
    const [rows] = await db.execute("SELECT * FROM schools");
    res.status(200).json(rows);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
