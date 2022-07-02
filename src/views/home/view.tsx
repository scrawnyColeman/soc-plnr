import React, { useEffect } from "react";

import { Card, Layout } from "components";
import { useGetMyTodos } from "src/hooks";
import { useSession } from "next-auth/react";

export type HomeViewProps = {};

const HomeView: React.FunctionComponent<HomeViewProps> = ({}) => {
  const session = useSession();
  const [myTodos, refreshMyTodos] = useGetMyTodos();

  useEffect(() => {
    (async () => {
      if (session !== null) {
        await refreshMyTodos();
      }
    })();
  }, [session]);

  return (
    <Layout className="p-4 w-100 h-100">
      <Card className="px-2 py-3">
        <h1 className="mt-2  font-bold text-purple-300">
          <pre>{JSON.stringify(myTodos, null, 2)}</pre>
        </h1>
      </Card>
    </Layout>
  );
};

export default HomeView;
