import type { NextPage } from "next";

import { AuthWrapper } from "wrappers";
import { TaskView } from "views";
import { Layout } from "organisms/layout";

const Task: NextPage = () => (
  <Layout className="p-4 w-100 h-100">
    <AuthWrapper>
      <TaskView />
    </AuthWrapper>
  </Layout>
);

export default Task;
