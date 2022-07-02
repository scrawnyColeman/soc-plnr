import { prisma } from "lib/prisma";

export const getTodos = async () => await prisma.todo.findMany();

export const getTodosByAuthor = async (authorId: string) =>
  await prisma.todo.findMany({ where: { authorId } });

export const getTodoById = async (todoId: string, requesterId: string) => {
  const response = await prisma.todo.findUnique({ where: { id: todoId } });
  if (response?.authorId === requesterId) {
    return response;
  }
  throw new Error(
    "Don't be sneaky. You'll have to ask permission to see this user's todos"
  );
};
