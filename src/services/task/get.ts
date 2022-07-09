import { prisma } from "lib/prisma";

export const getTasks = async () => await prisma.task.findMany({ select: {} });

export const getTasksByAuthor = async (authorId: string) =>
  await prisma.taskStep.findMany({
    where: { Task: { authorId } },
    select: {
      id: true,
      Task: true,
      Assignees: true,
      completedBy: true,
      content: true,
      isCompleted: true,
      isInitialStep: true,
      predecessor: true,
      predecessorId: true,
      successor: true,
      taskId: true,
      title: true,
    },
  });

export const getMyTasks = async (userId: string) =>
  await prisma.taskStep.findMany({
    where: { Task: { userId }, Assignees: { some: { userId } } },
    select: {
      id: true,
      Task: true,
      completedBy: true,
      content: true,
      isCompleted: true,
      isInitialStep: true,
      predecessor: true,
      predecessorId: true,
      successor: true,
      taskId: true,
      title: true,
    },
  });

export const getTaskStepById = async (
  taskStepId: string,
  requesterId: string
) => {
  console.log({ hello: "world" });
  const [response] = await prisma.taskStep.findMany({
    where: { id: taskStepId },
    select: {
      id: true,
      completedBy: true,
      content: true,
      isCompleted: true,
      isInitialStep: true,
      taskId: true,
      title: true,
      Assignees: {
        include: { User: { select: { email: true, name: true, image: true } } },
      },
    },
  });

  const isAssignedUser = response?.Assignees.map(
    (assignee) => assignee.userId
  ).includes(requesterId);

  console.log({ assignees: response.Assignees, requesterId });
  if (isAssignedUser) {
    return response;
  }

  throw new Error(
    "Don't be sneaky. You'll have to ask permission to see this user's tasks"
  );
};
