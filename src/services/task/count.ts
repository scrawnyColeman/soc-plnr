import { prisma } from "lib/prisma";

export const countTasks = async () => await prisma?.task.count();
