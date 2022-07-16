import { useAlert } from "hooks/context";
import { useCallback } from "react";

type Args = {
  email: string;
};

type Hook = () => (body: Args) => Promise<void>;

export const useFollowUser: Hook = () => {
  const { setAlert } = useAlert();

  const followUser = useCallback(async (body: Args) => {
    const response = await fetch("/api/social/follow", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();

    console.log({ result });

    if (!response.ok && result.message) {
      setAlert({ text: result.message, type: "ERROR" });
    }
  }, []);

  return followUser;
};
