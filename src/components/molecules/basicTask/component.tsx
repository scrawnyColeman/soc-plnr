import React, { FunctionComponent } from "react";
import Link from "next/link";

import { Button } from "atoms";

export type BasicTaskProps = {
  task: {
    title: string;
    content: string;
    id: string;
  };
};

const BasicTask: FunctionComponent<BasicTaskProps> = ({ task }) => (
  <div className="hover:bg-slate-50 flex gap-3 p-4 rounded-lg shadow-lg bg-white w-full  justify-between items-center">
    <div>
      <h3 className="font-bold">{task.title}</h3>
      <p className="text-purple-800">{task.content}</p>
    </div>
    <div>
      <Link href={`/t/${task.id}`}>
        <Button>
          <a>View</a>
        </Button>
      </Link>
    </div>
  </div>
);

export default BasicTask;
