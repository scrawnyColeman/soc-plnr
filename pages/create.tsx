import type { NextPage } from "next";

import { CreateView } from "views";
import { Layout } from "organisms";
import { AuthWrapper } from "wrappers";

const Create: NextPage = () => (
  <Layout className="p-4 text-purple-100">
    <AuthWrapper redirectPath="HOME">
      <CreateView />
    </AuthWrapper>
  </Layout>
);

export default Create;
