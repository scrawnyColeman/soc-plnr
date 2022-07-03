import { prisma } from "lib/prisma";
import { getTodoById } from "./get";

type Args = {
  requesterId: string;
  todoId: string;
  particpantEmail: string;
};

export const addParticipantByEmail = async ({
  particpantEmail,
  requesterId,
  todoId,
}: Args) => {
  const { id, title } = await getTodoById(todoId, requesterId);

  const res = await prisma.todo.upsert({
    where: { id },
    create: {
      authorId: requesterId,
      title,
      assignees: {
        connectOrCreate: [
          { where: { email: particpantEmail }, create: { id: todoId } },
        ],
      },
    },
    update: {
      assignees: {
        connectOrCreate: [
          { where: { email: particpantEmail }, create: { id: todoId } },
        ],
      },
    },
  });

  console.log({ res });

  return res;
};
