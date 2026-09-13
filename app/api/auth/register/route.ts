import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import bcrypt from "bcryptjs";
import { eq, or } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { name, username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    const existing = await db.select().from(users).where(or(eq(users.username, username), eq(users.email, email))).limit(1);
    if (existing.length > 0) {
      const isUsername = existing[0].username === username;
      return NextResponse.json({ error: isUsername ? "Username sudah digunakan" : "Email sudah digunakan" }, { status: 400 });
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
