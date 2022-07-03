import { NextApiRequest, NextApiResponse } from "next";

import { validateSession } from "lib/validateSession";

import { followUser } from "services/social/followUser";
import { getFollowers, getFollowing } from "services/social/get";
import { getMe } from "services/me/getMe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  const session = await validateSession(req);
  const me = await getMe(session);
  const id = me?.id as string;

  try {
    if (req.method === "GET") {
      const [following, followers] = await Promise.all([
        getFollowing(id),
        getFollowers(id),
      ]);
      res.status(200).json({ following, followers });
    } else if (req.method === "PUT") {
      const response = await followUser(req, id);
      res.status(201).json(response);
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
