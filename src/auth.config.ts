import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [Google],
  pages: {
    signIn: "/",
  },
  callbacks: {
    authorized: async ({ auth }) => !!auth,
    async session({ session, token }) {
      if (session.user && token && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
