import { prisma } from "lib/prisma";
import { NextApiRequest } from "next";

export const followUser = async (req: NextApiRequest, userId: string) => {
  if (!req.body.email) {
    throw new Error("Email is required to follow a friend");
  }
  const response = await prisma.user.findUnique({
    where: { email: req.body.email },
    select: { id: true },
  });

  if (response) {
    return await prisma.follows.create({
      data: {
        follower: { connect: { id: userId } },
        following: { connect: { id: response.id } },
      },
    });
  }

  throw new Error("Email doesn't exist in the system");
};
