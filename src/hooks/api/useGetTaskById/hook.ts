import { useCallback, useState } from "react";

type Hook = () => [TaskStep | undefined, (id: string) => Promise<TaskStep>];

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

export const useGetTaskStepById: Hook = () => {
  const [state, setState] = useState<TaskStep | undefined>();

  const getTaskStepById = useCallback(async (id: string) => {
    const response = await fetch(`/api/task?t=${id}`);
    const result = await response.json();

    if (response.ok) {
      setState(result);
    }

    return result;
  }, []);

  return [state, getTaskStepById];
};
