import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { elegies } from '@/lib/db/schema';
import { generateElegy } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { pastSelf, presentSelf } = body;

    if (!pastSelf || !presentSelf || pastSelf.length < 10 || presentSelf.length < 10) {
      return NextResponse.json({ error: 'Input tidak valid. Minimal 10 karakter.' }, { status: 400 });
    }

    const aiResult = await generateElegy(pastSelf, presentSelf);

    const inserted = await db.insert(elegies).values({
      userId: session.user.id,
      pastSelf,
      presentSelf,
      eulogyText: aiResult.eulogy,
      mirrorText: aiResult.mirror,
    }).returning({ id: elegies.id });

    return NextResponse.json({
      id: inserted[0].id,
      eulogy: aiResult.eulogy,
      mirror: aiResult.mirror
    }, { status: 201 });

  } catch (error: any) {
    console.error("Elegy API Error:", error);
    return NextResponse.json({ error: error.message || 'Terjadi kesalahan server' }, { status: 500 });
  }
}
