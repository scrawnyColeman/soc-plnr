import { NextApiRequest } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const validateSession = async (req: NextApiRequest) => {
  const session = await getSession({ req });

  if (session === null) {
    throw new Error("Invalid session");
  }

  console.log({ session });

  return session as Session;
};
