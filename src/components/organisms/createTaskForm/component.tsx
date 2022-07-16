import React, { FormEventHandler, FunctionComponent, useState } from "react";
import Router from "next/router";

import { useCreateTask } from "hooks";
import { Button } from "atoms";
import { LabelledInput, LabelledTextArea } from "molecules";

type CreateTaskFormProps = {};

const CreateTaskForm: FunctionComponent<CreateTaskFormProps> = ({}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, createTask] = useCreateTask();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const task = await createTask({ title, content });
    if (task === null) {
      // successfully created
      return;
    }

    Router.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <LabelledInput
        wrapperClassName="my-2"
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
        wrapperClassName="my-2"
        className="my-2"
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
          isLoading={isLoading}
          disabled={isLoading || !title || !content}
        >
          Create
        </Button>

        <p className="mx-2">or</p>

        <Button type="button" onClick={() => Router.push("/")}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default CreateTaskForm;
