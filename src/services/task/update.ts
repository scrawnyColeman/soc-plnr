import { prisma } from "lib/prisma";
import { getTaskStepById } from "services/task";

type Args = {
  requesterId: string;
  taskStepId: string;
  participantEmail: string;
};

export const addParticipantByEmail = async ({
  participantEmail,
  requesterId,
  taskStepId,
}: Args) => {
  const taskStep = await getTaskStepById(taskStepId, requesterId);

  const result = await prisma.taskStep.update({
    where: { id: taskStep?.id },
    data: {
      Assignees: {
        create: {
          User: { connect: { email: participantEmail } },
        },
      },
    },
  });

  // console.log({ result });

  return result;
};

type UpdateArgs = {
  requesterId: string;
  taskStepId: string;
  data: Partial<{
    id: string;
    completedBy: string;
    content: string;
    isCompleted: boolean;
    isInitialStep: boolean;
    taskId: string;
    title: string;
  }>;
};

export const updateTaskStepById = async ({
  taskStepId,
  requesterId,
  data,
}: UpdateArgs) => {
  console.log({ taskStepId, requesterId });
  const taskStep = await getTaskStepById(taskStepId, requesterId);
  const editedKeys: Record<string, any> = {};
  Object.keys(data).forEach((editedField) => {
    editedKeys[editedField] = true;
  });

  return await prisma.taskStep.update({
    data: { ...data },
    select: editedKeys,
    where: { id: taskStep.id },
  });
};
