import { NextApiHandler } from "next";
import NextAuth, { CallbacksOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) => {
  console.log({ req });
  console.log({ res });
  return NextAuth(req, res, options);
};
export default authHandler;

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile?.email?.endsWith("@gmail.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  } as Partial<CallbacksOptions>,
};
