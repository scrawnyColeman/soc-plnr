import type { NextPage } from "next";

import { HomeView } from "views";
import { Layout } from "organisms";
import { AuthWrapper } from "wrappers";

const Home: NextPage = () => (
  <Layout className="p-6 w-full h-100 flex flex-wrap gap-2">
    <AuthWrapper>
      <HomeView />
    </AuthWrapper>
  </Layout>
);

export default Home;
