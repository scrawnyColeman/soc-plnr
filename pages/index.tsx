import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useGetMyTodos, useGetTodos } from "src/hooks";
import { HomeView } from "views";

const Home: NextPage = () => {
  const [todos, refreshTodos] = useGetTodos();
  const [myTodos, refreshMyTodos] = useGetMyTodos();
  const session = useSession();

  useEffect(() => {
    (async () => {
      if (session !== null) {
        await Promise.all([refreshTodos(), refreshMyTodos()]);
      }
    })();
  }, [session]);

  return <HomeView />;
};

export default Home;
