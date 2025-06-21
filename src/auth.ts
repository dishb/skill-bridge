import NextAuth from "next-auth";
import authConfig from "./auth.config";
import client from "./lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(client, { databaseName: "customerdb" }),
  session: { strategy: "jwt" },
  ...authConfig,
});
