import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { name, username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const existingUser = await db.select().from(users).where(eq(users.username, username));
    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Username sudah digunakan" }, { status: 400 });
    }

    const existingEmail = await db.select().from(users).where(eq(users.email, email));
    if (existingEmail.length > 0) {
      return NextResponse.json({ error: "Email sudah digunakan" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      username,
      email,
      password: hashedPassword,
      provider: "credentials",
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
