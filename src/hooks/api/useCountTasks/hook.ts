import { useCallback, useId, useState } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
};

type State = {
  tasks: Task[];
};

type Hook = () => [State, () => Promise<void>];

export const useCountTasks: Hook = () => {
  const [state, setState] = useState<State>({ tasks: [] });

  const ids = [useId(), useId()];

  const refresh = useCallback(async () => {
    const response = await fetch("/api/task/count");
    const result = await response.json();
    console.log({ response });
    console.log({ result });

    setState(() => ({
      tasks: [
        {
          id: ids[0],
          completed: true,
          description:
            "Make a business account on Revolut for taking payments.",
          title: "Make Revolut account",
        },
        {
          id: ids[1],
          completed: true,
          description:
            "Make an Etsy page to start selling prints and link it to the new business Revolut account. Check with Tesco how much making each print will cost",
          title: "Make Revolut account",
        },
      ],
    }));
  }, []);

  return [state, refresh];
};
