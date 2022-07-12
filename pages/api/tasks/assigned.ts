import { NextApiRequest, NextApiResponse } from "next";

import { validateSession } from "lib/validateSession";

import { getMe } from "src/services/me/getMe";
import { getMyTasks } from "src/services/task/get";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  // TODO - Handle completed vs in progress
  // TODO - Handle social feed / public vs private tasks
  try {
    const session = await validateSession(req);
    const requester = await getMe(session);

    if (req.method === "GET") {
      const response = await getMyTasks(requester?.id as string);
      res.status(200).json(response);
    } else {
      throw new Error("Can only use GET on this path");
    }
  } catch (e) {
    const message = (e as Error).message;
    console.log({ message });
    res.status(500).json({
      message,
    });
  }
};

export default handler;

export const config = {};
