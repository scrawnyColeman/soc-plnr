import { NextApiRequest, NextApiResponse } from "next";

import { validateSession } from "lib/validateSession";

import { getMe } from "src/services/me/getMe";
import { getTasksByAuthor } from "src/services/task";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  try {
    const session = await validateSession(req);
    console.log({ session });
    const requester = await getMe(session);
    console.log({ requester });

    if (req.method !== "GET") {
      throw new Error("Can only use GET on this path");
    }

    const response = await getTasksByAuthor(requester?.id as string);
    res.status(200).json(response);
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
