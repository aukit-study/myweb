"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    });


    const data = await res.json();
    setUploadedUrl(data.url);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">📤 อัปโหลดไฟล์</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {uploadedUrl && (
        <div className="mt-4">
          <p>✅ ไฟล์ถูกอัปโหลดเรียบร้อย:</p>
          <a
            href={uploadedUrl}
            download
            className="text-blue-500 underline"
            target="_blank"
          >
            ดาวน์โหลด {uploadedUrl.split("/").pop()}
          </a>
        </div>
      )}
    </div>
    </div>
  );
}
