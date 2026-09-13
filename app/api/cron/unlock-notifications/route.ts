import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { elegies, users } from '@/lib/db/schema';
import { and, eq, lte, isNotNull } from 'drizzle-orm';
import { sendUnlockNotificationEmail } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const now = new Date();

    // Find unlocked elegies that haven't been notified yet
    const pendingElegies = await db
      .select({
        id: elegies.id,
        userEmail: users.email,
        userName: users.name,
      })
      .from(elegies)
      .innerJoin(users, eq(elegies.userId, users.id))
      .where(
        and(
          isNotNull(elegies.unlockDate),
          lte(elegies.unlockDate, now),
          eq(elegies.notified, false)
        )
      );

    let notifiedCount = 0;

    for (const item of pendingElegies) {
      if (item.userEmail) {
        await sendUnlockNotificationEmail(item.userEmail, item.userName || '', item.id);
        await db.update(elegies).set({ notified: true }).where(eq(elegies.id, item.id));
        notifiedCount++;
      }
    }

    return NextResponse.json({ success: true, notifiedCount });
  } catch (error: any) {
    console.error("Cron notification error:", error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
