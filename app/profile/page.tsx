"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Set initial form values when session loads
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // ตัวอย่างส่งข้อมูลไป API route เพื่ออัพเดตข้อมูล user
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      setMessage("Profile updated successfully!");

      // ถ้าต้องการ รีเฟรช session เพื่อให้ข้อมูลใหม่แสดง
      router.refresh();
    } catch (error) {
      setMessage("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return null;

  return (
    <section>
        <div className="stars"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
      <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
        <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-gray-700">Name</span>
            <input
              type="text"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              className="mt-1 block w-full rounded border-gray-300 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}

        <button
          className="mt-6 text-sm text-red-600 underline"
          onClick={() => signOut()}
        >
          Logout
        </button>
      </div>
      </div>
    </section>
  );
}
