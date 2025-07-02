import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route"; // ปรับ path ให้ตรงกับที่คุณตั้ง

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, email } = body;

  // TODO: อัพเดตข้อมูล user ในฐานข้อมูลของคุณ
  // ตัวอย่าง (pseudo code):
  // await db.user.update({ where: { id: session.user.id }, data: { name, email } });

  // ส่งกลับข้อมูลใหม่ (หรือ status)
  return NextResponse.json({ message: "Profile updated" });
}
