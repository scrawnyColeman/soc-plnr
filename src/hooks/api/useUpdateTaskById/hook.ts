import { useCallback } from "react";

type Hook = () => (args: Args) => Promise<unknown>;

type Args = {
  id: string;
  data: Partial<TaskStep>;
};

type TaskStep = {
  id: string;
  completedBy: string;
  content: string;
  isCompleted: boolean;
  isInitialStep: boolean;
  taskId: string;
  title: string;
  Assignees: {
    userId: string;
    taskStepId: string;
    User: {
      email: string;
      name: string;
      image: string | null;
    };
  }[];
};

export const useUpdateTaskById: Hook = () => {
  const updateTaskById = useCallback(async (body: Args) => {
    const response = await fetch("/api/task", {
      method: "PUT",
      body: JSON.stringify(body),
    });
    return await response.json();
  }, []);

  return updateTaskById;
};
