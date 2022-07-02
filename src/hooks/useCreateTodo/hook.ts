import { useCallback, useState } from "react";

type Args = {
  title: string;
  content: string;
};

type Hook = () => [unknown, (body: Args) => Promise<void>];

export const useCreateTodo: Hook = () => {
  const [state, setState] = useState<unknown>();

  const createPost = useCallback(async (body: Args) => {
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    console.log({ result });

    if (response.ok) {
      setState(result);
    }
  }, []);

  return [state, createPost];
};
