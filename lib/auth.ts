import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { eq } from 'drizzle-orm';
import { db } from './db';
import { users } from './db/schema';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const userArr = await db.select().from(users).where(eq(users.username, credentials.username as string));
        const user = userArr[0];

        if (!user || !user.password) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password as string, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const existingUser = await db.select().from(users).where(eq(users.email, user.email as string));
        
        if (existingUser.length === 0) {
          await db.insert(users).values({
            email: user.email as string,
            name: user.name || profile?.name,
            image: user.image || profile?.picture,
            provider: 'google',
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === 'google') {
           const dbUser = await db.select().from(users).where(eq(users.email, user.email as string));
           if (dbUser.length > 0) {
              token.id = dbUser[0].id;
           }
        } else {
           token.id = user.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
