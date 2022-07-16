import React, { FormEventHandler, FunctionComponent, useState } from "react";
import Router from "next/router";

import { useCreateTask } from "hooks";
import { Button, Spinner } from "atoms";
import { LabelledInput, LabelledTextArea } from "molecules";

type CreateTaskFormProps = {};

const CreateTaskForm: FunctionComponent<CreateTaskFormProps> = ({}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, createTask] = useCreateTask();

  const submitData: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const task = await createTask({ title, content });
    if (task === null) {
      // successfully created
      return;
    }

    Router.push("/");
  };

  return (
    <form onSubmit={submitData}>
      <LabelledInput
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Solve X"
        type="text"
        value={title}
        id="title"
      >
        Title
      </LabelledInput>

      <LabelledTextArea
        cols={50}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Try the thing and automagically it will work"
        rows={8}
        value={content}
        id="content"
      >
        Content
      </LabelledTextArea>
      <div className="w-full flex items-center">
        <Button
          type="submit"
          disabled={isLoading || !title || !content}
          className="bg-neutral-50 text-neutral-600 border-none py-1 px-4 rounded-md disabled:opacity-50 hover:bg-purple-600 hover:text-purple-50"
        >
          {isLoading ? <Spinner /> : "Create"}
        </Button>
        <p className="mx-2">or</p>
        <Button onClick={() => Router.push("/")}>Cancel</Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
