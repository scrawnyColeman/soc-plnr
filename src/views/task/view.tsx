import React, {
  ChangeEventHandler,
  FormEventHandler,
  FunctionComponent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { useAddAssignee, useGetTaskStepById, useUpdateTaskById } from "hooks";
import { Card, Button, Spinner } from "atoms";

import { profilePic } from "assets";

export type TaskViewProps = {};

const TaskView: FunctionComponent<TaskViewProps> = ({}) => {
  const [isTaskStepLoading, taskStep, fetchTaskStep] = useGetTaskStepById();
  const updateTask = useUpdateTaskById();
  const [, addAssignee] = useAddAssignee();
  const [email, setEmail] = useState<string>();

  const { query, isReady } = useRouter();

  useEffect(() => {
    (async () => {
      if (isReady) {
        await fetchTaskStep(query.id as string);
      }
    })();
  }, [isReady, query]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (typeof email === "string" && Boolean(email.length)) {
      await addAssignee(query.id as string, email);
      await fetchTaskStep(query.id as string);
    }
    return;
  };

  const handleComplete: MouseEventHandler<HTMLButtonElement> = async () => {
    if (query.id) {
      await updateTask({ id: query.id as string, data: { isCompleted: true } });
      await fetchTaskStep(query.id as string);
    }
    return;
  };

  if (isTaskStepLoading) return <Spinner />;

  return typeof taskStep === "undefined" ? (
    <Card className="p-4 w-100">Hello world</Card>
  ) : (
    <>
      <Card className="p-4 w-100">
        <h3 className="font-bold text-cyan-600 font-mono">{taskStep.title}</h3>
        <div className="p-4 border-solid border border-stone-300 rounded-lg">
          <p>{taskStep.content}</p>
        </div>
        <p>Due date: {taskStep.completedBy}</p>
        <p>{taskStep.isCompleted ? "Complete" : "In progress"}</p>

        <div className="flex flex-col gap-2">
          <h3>Assigned to:</h3>
          <div className="flex flex-wrap gap-4">
            {taskStep.Assignees.map((assignee) => (
              <span
                className="flex items-center h-10 gap-2"
                key={`assignee-${assignee.User.email}`}
              >
                <img
                  className="rounded-full"
                  width={48}
                  height={48}
                  src={assignee.User.image || profilePic.src}
                />
                <p>{assignee.User.name}</p>
              </span>
            ))}
          </div>
        </div>
      </Card>
      <br />
      <form className="flex gap-3 items-center" onSubmit={handleSubmit}>
        <input
          className="p-2"
          value={email}
          onChange={handleChange}
          autoFocus
        />
        <Button
          className="text-purple-50 border border-solid rounded-lg border-purple-50 p-2"
          type="submit"
        >
          Assign email
        </Button>
      </form>

      <hr className="my-2" />

      <Button
        className="text-purple-50 border border-solid rounded-lg border-purple-50 p-2"
        onClick={handleComplete}
      >
        Complete task
      </Button>
    </>
  );
};

export default TaskView;
