// @ts-nocheck
import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => {
  return NextAuth(req, res, options);
};
export default authHandler;

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ account }) => {
      if (account.provider === "google") {
        return true;
      }
      return false;
    },
    jwt: ({ token, account }) => {
      token = { accessToken: account?.access_token };
      return token;
    },
    session: async ({ session, user }) => {
      const thisAccount = await prisma.account.findFirst({
        where: { provider: "google", userId: user.id },
      });
      session.user.accessToken = thisAccount?.access_token ?? undefined;
      return session;
    },
  },
};
