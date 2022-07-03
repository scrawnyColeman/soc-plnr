import { prisma } from "lib/prisma";

type CreateTodo = {
  authorId: string;
  title: string;
  content: string;
};

export const createTodo = async ({ authorId, title, content }: CreateTodo) => {
  const lifeSpan = 1000 * 60 * 60 * 24 * 2; // two days
  const completedBy = new Date(Date.now() + lifeSpan);

  return await prisma.todo.create({
    data: {
      title,
      content,
      completedBy,
      authorId,
      assignees: { connect: { id: authorId } },
    },
  });
};
