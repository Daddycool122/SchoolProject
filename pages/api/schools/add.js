import multer from "multer";
import path from "path";
import { connectDB } from "@/lib/db";

// Multer storage setup
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/schoolimages",
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  }),
});

// Disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to run middleware
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      resolve(result);
    });
  });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Run Multer middleware
    await runMiddleware(req, res, upload.single("image"));

    // Validate file
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const { name, address, city, state, contact, email_id } = req.body;

    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const imagePath = `/schoolimages/${req.file.filename}`;

    // Insert into DB
    const db = await connectDB();
    await db.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, imagePath, email_id]
    );

    return res.status(200).json({ message: "School added successfully!" });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
