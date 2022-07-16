import { useAlert } from "hooks/context";
import { useCallback, useState } from "react";

type Args = {
  title: string;
  content: string;
};

type CreatedTask = Record<string, any>;

type Hook = () => [boolean, (body: Args) => Promise<CreatedTask | null>];

export const useCreateTask: Hook = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setAlert } = useAlert();

  const createTask = useCallback(async (body: Args) => {
    setLoading(true);

    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = (await response.json()) as CreatedTask;

      if (response.ok) {
        setAlert({
          type: "SUCCESS",
          text: `Successfully created task: ${body.title}`,
        });
        return result;
      } else if ("message" in result) {
        throw new Error(result.message);
      }
    } catch (e) {
      const message = (e as Error).message;
      setAlert({ type: "ERROR", text: message });
    } finally {
      setLoading(false);
    }

    return null;
  }, []);

  return [isLoading, createTask];
};
