import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { getUserById } from "./actions/users";
import authConfig from "./auth.config";
import { db } from "./lib/db";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.role = existingUser.role;

      return token;
    },
    async session({ token, session }) {
      // console.log({ token, session });
      
      return {
        ...session,
        user: {
          ...session.user,
          role: token.role,
        },
      };
    },
  },
});