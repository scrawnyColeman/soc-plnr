import { useAlert } from "hooks/context";
import { useCallback, useState } from "react";

type Args = {
  email: string;
};

type Hook = () => [boolean, (body: Args) => Promise<unknown | null>];

export const useFollowUser: Hook = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setAlert } = useAlert();

  const followUser = useCallback(async (body: Args) => {
    setLoading(true);
    try {
      const response = await fetch("/api/social/follow", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();

      console.log({ result });

      if (response.ok) {
        setAlert({
          type: "SUCCESS",
          text: `Followed: ${body.email}`,
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

  return [isLoading, followUser];
};
