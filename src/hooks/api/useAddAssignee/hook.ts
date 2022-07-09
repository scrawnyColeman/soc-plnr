import { useCallback, useState } from "react";

type Hook = () => [unknown, (todoId: string, email: string) => Promise<void>];

export const useAddAssignee: Hook = () => {
  const [state, setState] = useState<unknown>();

  const refresh = useCallback(async (todoId: string, email: string) => {
    const response = await fetch("/api/todo/participants/add", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoId, email }),
    });
    const result = await response.json();

    console.log({ result });

    if (response.ok) {
      setState(result);
    }
  }, []);

  return [state, refresh];
};
