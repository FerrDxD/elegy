import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: text('username').unique(),
  email: text('email').unique().notNull(),
  password: text('password'),
  name: text('name'),
  image: text('image'),
  provider: text('provider').notNull().default('credentials'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const elegies = pgTable('elegies', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  pastSelf: text('past_self').notNull(),
  presentSelf: text('present_self').notNull(),
  eulogyText: text('eulogy_text').notNull(),
  mirrorText: text('mirror_text').notNull(),
  isPublic: boolean('is_public').default(false),
  unlockDate: timestamp('unlock_date'),
  createdAt: timestamp('created_at').defaultNow(),
});
