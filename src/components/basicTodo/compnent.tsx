import Link from "next/link";
import React from "react";

export type BasicTodoProps = {
  todo: {
    title: string;
    content: string;
    id: string;
  };
};

const BasicTodo: React.FunctionComponent<BasicTodoProps> = ({ todo }) => (
  <div className="hover:bg-slate-50 flex gap-3 p-4 rounded-lg shadow-lg bg-white w-full  justify-between items-center">
    <div className="">
      <h3 className="font-bold">{todo.title}</h3>
      <p className="text-purple-800">{todo.content}</p>
    </div>
    <div>
      <Link href={`/t/${todo.id}`}>
        <button className="border-solid border border-fuchsia-700 rounded-2xl py-1 px-3 hover:bg-fuchsia-50">
          <a>View</a>
        </button>
      </Link>
    </div>
  </div>
);

export default BasicTodo;
