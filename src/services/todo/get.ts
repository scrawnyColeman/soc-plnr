import { prisma } from "lib/prisma";

export const getTodos = async () => await prisma.todo.findMany();

export const getTodosByAuthor = async (authorId: string) =>
  await prisma.todo.findMany({ where: { authorId } });
