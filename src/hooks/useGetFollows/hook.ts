import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

type Hook = () => [boolean, unknown, () => Promise<unknown>];

export const useGetFollows: Hook = () => {
  const [state, setState] = useState<unknown>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const session = useSession();

  const getFollows = useCallback(async () => {
    setLoading(true);

    const response = await fetch("/api/social");
    const result = await response.json();

    console.log({ result });

    if (response.ok) {
      setState(result);
    }

    setLoading(false);
    return result;
  }, [session]);

  return [isLoading, state, getFollows];
};
