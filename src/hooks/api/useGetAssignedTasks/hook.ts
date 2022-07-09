import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

type Hook = () => [unknown, () => Promise<unknown>];

export const useGetAssignedTasks: Hook = () => {
  const [state, setState] = useState<unknown>();
  const session = useSession();

  const getAssignedTasks = useCallback(async () => {
    const response = await fetch("/api/tasks/assigned");
    const result = await response.json();

    console.log({ result });

    if (response.ok) {
      setState(result);
    }

    return result;
  }, [session]);

  return [state, getAssignedTasks];
};
