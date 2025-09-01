import multer from "multer";
import path from "path";
import { connectDB } from "@/lib/db";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/schoolimages",
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (req.method === "POST") {
    upload.single("image")(req, {}, async (err) => {
      if (err) {
        console.error("Multer error:", err);
        return res.status(500).json({ error: "File upload failed" });
      }

      try {
        const { name, address, city, state, contact, email_id } = req.body;
        const imagePath = `/schoolimages/${req.file.filename}`;

        const db = await connectDB();
        await db.execute(
          "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [name, address, city, state, contact, imagePath, email_id]
        );

        res.status(200).json({ message: "School added successfully!" });
      } catch (e) {
        console.error("DB error:", e);
        res.status(500).json({ error: e.message });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
