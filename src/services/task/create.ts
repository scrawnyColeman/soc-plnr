import { prisma } from "lib/prisma";

type CreateTask = {
  authorId: string;
  title: string;
  content: string;
};

// export const createTask = async ({ authorId, title, content }: CreateTask) => {
//   const lifeSpan = 1000 * 60 * 60 * 24 * 2; // two days
//   const completedBy = new Date(Date.now() + lifeSpan);

//   return await prisma.task.create({
//     data: {
//       title,
//       content,
//       completedBy,
//       authorId,
//       steps: { create: { name: "Do something", }}
//       assignees: { connect: { id: authorId } },
//     },
//   });
// };

export const createSingleStepTask = async ({
  authorId,
  title,
  content,
}: CreateTask) => {
  const lifeSpan = 1000 * 60 * 60 * 24 * 2; // two days
  const completedBy = new Date(Date.now() + lifeSpan);

  return await prisma.task.create({
    data: {
      authorId,
      title,
      content,
      completedBy,
      userId: authorId,
      steps: {
        create: {
          title,
          completedBy,
          content,
          isInitialStep: true,
          Assignees: { create: { User: { connect: { id: authorId } } } },
        },
      },
    },
  });
};
