import React, { FunctionComponent } from "react";

import { Layout, CreateTaskForm } from "organisms";

const CreateView: FunctionComponent = () => (
  <Layout>
    <div className="p-4 text-purple-100">
      <CreateTaskForm />
    </div>
  </Layout>
);

export default CreateView;
