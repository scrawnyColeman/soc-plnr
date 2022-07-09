import { NextApiRequest, NextApiResponse } from "next";

import { validateSession } from "lib/validateSession";

import { getMe } from "src/services/me/getMe";
import { createSingleStepTask } from "src/services/task/create";
import { getTaskStepById } from "src/services/task";
import { updateTaskStepById } from "services/task/update";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  try {
    const session = await validateSession(req);
    const requester = await getMe(session);

    if (req.method === "GET") {
      // TODO - Implement a GET resolver
      if ("t" in req.query && requester?.id) {
        const response = await getTaskStepById(
          req.query.t as string,
          requester?.id
        );
        res.status(200).json(response);
      } else {
        throw new Error("Didn't receive a taskId");
      }
    } else if (req.method === "POST") {
      // TODO - Implement a POST resolver
      const response = await createSingleStepTask({
        authorId: requester?.id as string,
        content: req.body.content,
        title: req.body.title,
      });
      res.status(202).json(response);
    } else if (req.method === "DELETE") {
      // TODO - Implement a DELETE resolver
      // handle delete case
    } else if (req.method === "PUT") {
      // TODO - Implement a PUT resolver
      const body = JSON.parse(req.body);
      const response = await updateTaskStepById({
        requesterId: requester?.id as string,
        data: body.data,
        taskStepId: body.id,
      });
      res.status(202).json(response);
    } else {
      throw new Error("Unsupported HTTP Method");
    }
  } catch (e) {
    const message = (e as Error).message;
    console.log({ message });
    res.status(500).json({
      message,
    });
  } finally {
    prisma?.$disconnect();
  }
};

export default handler;
