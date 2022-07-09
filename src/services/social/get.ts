import { prisma } from "lib/prisma";

export const getFollowing = async (userId: string) =>
  await prisma.follows.findMany({
    where: { followerId: { equals: userId } },
    select: { following: { select: { image: true, name: true, id: true } } },
  });

export const getFollowers = async (userId: string) =>
  await prisma.follows.findMany({
    where: { followingId: { equals: userId } },
    select: { follower: { select: { image: true, name: true, id: true } } },
  });
