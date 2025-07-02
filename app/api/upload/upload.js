// pages/api/upload.js
import formidable from "formidable";
import fs from "fs";
import path from "path";

// ปิด body parser ของ Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadsDir = path.join(process.cwd(), "public/uploads");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({
      uploadDir: uploadsDir,
      keepExtensions: true,
    });

    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    form.parse(req, (err, fields, files) => {
      if (err) return res.status(500).json({ error: "Upload error" });

      const file = files.file[0];
      const filename = path.basename(file.filepath);
      res.status(200).json({ url: `/uploads/${filename}`, filename });
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
