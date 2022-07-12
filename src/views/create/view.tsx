import React, { useState } from "react";
import { Layout } from "components";
import Router from "next/router";
import { useCreateTask } from "src/hooks";

const CreateView: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [created, createTask] = useCreateTask();

  const submitData: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await createTask({ title, content });
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="p-4 text-fuchsia-100">
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            className="w-full p-2 my-2 rounded-md border border-solid border-b-neutral-800"
            value={title}
          />
          <textarea
            cols={50}
            className="w-full p-2 rounded-md"
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <button
            type="submit"
            className="bg-neutral-50 text-neutral-600 border-none py-1 px-2 rounded-md"
          >
            Create
          </button>
          <a className="ml-1" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
    </Layout>
  );
};

export default CreateView;
