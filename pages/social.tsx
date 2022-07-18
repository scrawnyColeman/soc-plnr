import type { NextPage } from "next";

import { SocialView } from "views";
import { Layout } from "organisms";
import { AuthWrapper } from "wrappers";

const Social: NextPage = () => (
  <Layout className="p-6 w-full h-100 flex flex-wrap gap-2">
    <AuthWrapper redirectPath="HOME">
      <SocialView />
    </AuthWrapper>
  </Layout>
);

export default Social;
