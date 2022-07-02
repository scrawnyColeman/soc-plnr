import { useCallback, useState } from "react";

type Hook = () => [unknown, (id: string) => Promise<unknown>];

export const useGetTodoById: Hook = () => {
  const [state, setState] = useState<unknown>();

  const getTodoById = useCallback(async (id: string) => {
    const response = await fetch(`/api/todo?t=${id}`);
    const result = await response.json();

    if (response.ok) {
      setState(result);
    }

    return result;
  }, []);

  return [state, getTodoById];
};
