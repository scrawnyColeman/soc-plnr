import type { NextPage } from "next";

import { CreateView } from "views";
import { Layout } from "organisms";
import { AuthWrapper } from "wrappers";
import { FullScreen } from "atoms";

const Create: NextPage = () => {
  const unAuthed = <FullScreen>You shall not pass</FullScreen>;

  return (
    <Layout className="p-4 text-purple-100">
      <AuthWrapper fallbackView={unAuthed}>
        <CreateView />
      </AuthWrapper>
    </Layout>
  );
};

export default Create;
