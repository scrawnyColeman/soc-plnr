// pages/drafts.tsx

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Layout } from "components";
import { prisma } from "../lib/prisma";

const Drafts: React.FC = () => {
  const { data: session } = useSession();
  const [drafts, setDrafts] = useState<{ id: string }[]>([]);

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-red-200">
        <h1>My Drafts</h1>
        <main>
          {drafts.map((post) => (
            <div key={post.id} className="post">
              <pre>{JSON.stringify(post, null, 2)}</pre>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
