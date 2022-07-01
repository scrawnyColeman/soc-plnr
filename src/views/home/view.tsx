import React from "react";
import Card from "../../components/card/component";
import { Layout } from "../_layout";

export type HomeViewProps = {};

const HomeView: React.FunctionComponent<HomeViewProps> = ({}) => (
  <Layout className="p-4 w-100 h-100">
    <Card className="px-2 py-3">
      <h1 className="mt-2 text-3xl font-bold underline">Hello world!</h1>
    </Card>
  </Layout>
);

export default HomeView;
