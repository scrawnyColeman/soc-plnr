import { NextApiRequest, NextApiResponse } from "next";

import { countTodos } from "src/services/todo";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  try {
    if (req.method !== "GET") {
      throw new Error("Can only use GET on this path");
    }
    const result = await countTodos();
    res.status(200).json(result);
  } catch (e) {
    const message = (e as Error).message;
    console.log({ message });
    res.status(500).json({
      message,
    });
  }
};

export default handler;
