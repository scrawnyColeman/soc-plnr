import { NextApiRequest, NextApiResponse } from "next";

import { validateSession } from "lib/validateSession";

import { getMe } from "src/services/me/getMe";
import { createTodo } from "src/services/todo/create";
import { getTodoById } from "src/services/todo/get";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  try {
    const session = await validateSession(req);
    const requester = await getMe(session);

    if (req.method === "GET") {
      if ("t" in req.query && requester?.id) {
        const response = await getTodoById(
          req.query.t as string,
          requester?.id
        );
        res.status(200).json(response);
      } else {
        throw new Error("Didn't receive a todoId");
      }
    } else if (req.method === "POST") {
      const response = await createTodo({
        authorId: requester?.id as string,
        content: req.body.content,
        title: req.body.title,
      });
      res.status(202).json(response);
    } else if (req.method === "DELETE") {
      // handle delete case
    } else if (req.method === "PATCH") {
      // handle edit case
    } else {
      throw new Error("Unsupported HTTP Method");
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
