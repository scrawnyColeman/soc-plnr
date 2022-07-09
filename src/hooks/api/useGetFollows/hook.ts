import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";

type Hook = () => [boolean, State, () => Promise<State>];

type State = {
  following: Following[];
  followers: Follower[];
};

type User = {
  id: string;
  name: string;
  image: string | null;
  email: string;
};

type Following = {
  following: User;
};
type Follower = {
  follower: User;
};
export const useGetFollows: Hook = () => {
  const [state, setState] = useState<State>({ followers: [], following: [] });
  const [isLoading, setLoading] = useState<boolean>(false);
  const session = useSession();

  const getFollows = useCallback(async () => {
    setLoading(true);

    const response = await fetch("/api/social");
    const result = (await response.json()) as State;

    console.log({ result });

    if (response.ok) {
      setState(result);
    }

    setLoading(false);
    return result;
  }, [session]);

  return [isLoading, state, getFollows];
};
