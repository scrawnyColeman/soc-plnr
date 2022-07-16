import React from "react";
import Link from "next/link";

import { Button } from "atoms";

export type BasicTaskProps = {
  task: {
    title: string;
    content: string;
    id: string;
  };
};

const BasicTask: React.FunctionComponent<BasicTaskProps> = ({ task }) => (
  <div className="hover:bg-slate-50 flex gap-3 p-4 rounded-lg shadow-lg bg-white w-full  justify-between items-center">
    <div>
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-purple-800">{task.content}</p>
    </div>
    <div>
      <Link href={`/t/${task.id}`}>
        <Button className="border-solid border border-fuchsia-700 rounded-2xl py-1 px-3 hover:bg-fuchsia-50">
          <a>View</a>
        </Button>
      </Link>
    </div>
  </div>
);

export default BasicTask;
