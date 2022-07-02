import { prisma } from "lib/prisma";
import { Session } from "next-auth";

export const getMe = async (session: Session) =>
  await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });
