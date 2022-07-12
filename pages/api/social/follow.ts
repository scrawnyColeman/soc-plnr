import { NextApiRequest, NextApiResponse } from "next";

import { validateSession } from "lib/validateSession";

import { followUser } from "services/social/followUser";
import { getMe } from "services/me/getMe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  try {
    const session = await validateSession(req);
    const me = await getMe(session);
    const id = me?.id as string;

    if (req.method !== "PUT") {
      throw new Error("Unsupported HTTP method");
    }

    const response = await followUser(req, id);
    res.status(201).json(response);
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
