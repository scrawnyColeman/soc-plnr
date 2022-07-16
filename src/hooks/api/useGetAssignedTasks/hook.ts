import { useAlert } from "hooks/context";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

// TODO - resolve type
type State = unknown;

type Hook = () => [boolean, State, () => Promise<State>];

export const useGetAssignedTasks: Hook = () => {
  const [state, setState] = useState<State>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setAlert } = useAlert();

  const session = useSession();

  const getAssignedTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/tasks/assigned");
      const result = await response.json();

      if (response.ok) {
        setState(result);
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
  }, [session]);

  return [isLoading, state, getAssignedTasks];
};
