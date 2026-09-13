import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { elegies } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const updated = await db
      .update(elegies)
      .set({ reactionsCount: sql`${elegies.reactionsCount} + 1` })
      .where(eq(elegies.id, id))
      .returning({ reactionsCount: elegies.reactionsCount });

    if (updated.length === 0) {
      return NextResponse.json({ error: 'Elegi tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ count: updated[0].reactionsCount });
  } catch (error: any) {
    return NextResponse.json({ error: 'Gagal memperbarui reaksi' }, { status: 500 });
  }
}
