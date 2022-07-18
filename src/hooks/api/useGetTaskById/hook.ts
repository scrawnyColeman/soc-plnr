import { useAlert } from "hooks/context";
import { useCallback, useState } from "react";

type Hook = () => [
  boolean,
  TaskStep | undefined,
  (id: string) => Promise<void>
];

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
  const [isLoading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<TaskStep | undefined>();

  const { setAlert } = useAlert();

  const getTaskStepById = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/task?t=${id}`);
      const result = await response.json();

      if (response.ok) {
        setState(result);
      } else if ("message" in result) {
        throw new Error(result.message);
      }
    } catch (e) {
      const message = (e as Error).message;
      setAlert({ type: "ERROR", text: message });
    } finally {
      setLoading(false);
    }
  }, []);

  return [isLoading, state, getTaskStepById];
};
