import { useCallback, useState } from "react";

type Hook = () => [unknown, () => Promise<unknown>];

export const useGetTasks: Hook = () => {
  const [state, setState] = useState<unknown>();

  const getTasks = useCallback(async () => {
    const response = await fetch("/api/tasks");
    const result = await response.json();

    console.log({ result });

    if (response.ok) {
      setState(result);
    }

    return result;
  }, []);

  return [state, getTasks];
};
