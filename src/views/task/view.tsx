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
import { Card, Button } from "atoms";
import { Layout } from "organisms";

import { profilePic } from "assets";

export type TaskViewProps = {};

const TaskView: FunctionComponent<TaskViewProps> = ({}) => {
  const [taskStep, fetchTaskStep] = useGetTaskStepById();
  const updateTask = useUpdateTaskById();
  const [, addAssignee] = useAddAssignee();
  const [email, setEmail] = useState<string>();

  const session = useSession();
  const { query, isReady } = useRouter();

  useEffect(() => {
    (async () => {
      if (session !== null && isReady) {
        await fetchTaskStep(query.id as string);
      }
    })();
  }, [isReady, session, query]);

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

  const isLoading = session === null || !taskStep;

  return (
    <Layout className="p-4 w-100 h-100">
      {isLoading ? (
        <svg
          role="status"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin  fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        <>
          <Card className="p-4 w-100">
            <h3 className="font-bold text-cyan-600 font-mono">
              {taskStep.title}
            </h3>
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
      )}
    </Layout>
  );
};

export default TaskView;
