import { NextApiRequest, NextApiResponse } from "next";

import { validateSession } from "lib/validateSession";

import { getMe } from "src/services/me/getMe";
import { getTasksByAuthor } from "src/services/task";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  try {
    if (req.method !== "GET") {
      throw new Error("Unsupported HTTP method.");
    }

    const session = await validateSession(req);
    const me = await getMe(session);
    const id = me?.id as string;
    const response = await getTasksByAuthor(id);

    res.status(200).json(response);
  } catch (e) {
    if (e instanceof Error) {
      const { message } = e;
      console.log({ message });
      res.status(500).json({
        message,
      });
    }
    console.log(e);
    res.status(500).json({ message: "Oops. Something went wrong!" });
  }
};

export default handler;
