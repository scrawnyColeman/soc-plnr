import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

type Hook = () => [unknown, () => Promise<unknown>];

export const useGetMyTodos: Hook = () => {
  const [state, setState] = useState<unknown>();
  const session = useSession();

  const getTodos = useCallback(async () => {
    const response = await fetch("/api/todo/me");
    const result = await response.json();

    console.log({ result });

    if (response.ok) {
      setState(result);
    }

    return result;
  }, [session]);

  return [state, getTodos];
};
