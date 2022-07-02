import React, { useEffect } from "react";

import { Card, Layout } from "components";
import { useGetTodos } from "src/hooks";

export type HomeViewProps = {};

const HomeView: React.FunctionComponent<HomeViewProps> = ({}) => {
  const [state, refresh] = useGetTodos();

  useEffect(() => {
    (async () => {
      await refresh();
    })();
  }, []);

  return (
    <Layout className="p-4 w-100 h-100">
      <Card className="px-2 py-3">
        <h1 className="mt-2  font-bold text-purple-300">
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </h1>
      </Card>
    </Layout>
  );
};

export default HomeView;
