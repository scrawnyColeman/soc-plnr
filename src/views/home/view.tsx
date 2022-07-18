import React, { FunctionComponent, useEffect } from "react";

import { useGetAssignedTasks } from "hooks";
import { Card, Spinner } from "atoms";
import { BasicTask } from "molecules";

export type HomeViewProps = {};

const HomeView: FunctionComponent<HomeViewProps> = ({}) => {
  const [isLoadingTasks, tasks, refreshTasks] = useGetAssignedTasks();

  useEffect(() => {
    (async () => {
      await refreshTasks();
    })();
  }, []);

  return isLoadingTasks ? (
    <Spinner />
  ) : (
    <Card className="h-72 overflow-y-auto w-full flex flex-col gap-2 md:w-[calc(50%-0.25rem)]">
      <h3 className="text-lg font-semibold">Your tasks:</h3>
      {Array.isArray(tasks) ? (
        tasks.map((task: { title: string; content: string; id: string }) => (
          <BasicTask key={task.id} task={task} />
        ))
      ) : (
        <p className="">
          Looking a bit bare here. Why not create your first task?
        </p>
      )}
    </Card>
  );
};

export default HomeView;
