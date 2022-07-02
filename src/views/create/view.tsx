// pages/create.tsx
import React, { useState } from "react";
import { Layout } from "components";
import Router from "next/router";
import { useCreateTodo } from "src/hooks";

const CreateView: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [created, createTodo] = useCreateTodo();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await createTodo({ title, content });
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="bg-blue-200 p-4">
        <form onSubmit={submitData}>
          <h1>New Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <button onSubmit={submitData}>Create</button>
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default CreateView;
