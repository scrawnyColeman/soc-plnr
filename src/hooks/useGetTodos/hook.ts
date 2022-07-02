import { useCallback, useState } from "react";

type Hook = () => [unknown, () => Promise<unknown>];

export const useGetTodos: Hook = () => {
  const [state, setState] = useState<unknown>();

  const getTodos = useCallback(async () => {
    const response = await fetch("/api/todos");
    const result = await response.json();

    console.log({ result });

    if (response.ok) {
      setState(result);
    }

    return result;
  }, []);

  return [state, getTodos];
};
