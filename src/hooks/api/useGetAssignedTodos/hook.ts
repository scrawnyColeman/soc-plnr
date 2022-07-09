import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

type Hook = () => [unknown, () => Promise<unknown>];

export const useGetAssignedTodos: Hook = () => {
  const [state, setState] = useState<unknown>();
  const session = useSession();

  const getAssignedTodos = useCallback(async () => {
    const response = await fetch("/api/todos/assigned");
    const result = await response.json();

    console.log({ result });

    if (response.ok) {
      setState(result);
    }

    return result;
  }, [session]);

  return [state, getAssignedTodos];
};
