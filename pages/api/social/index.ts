import { NextApiRequest, NextApiResponse } from "next";

import { validateSession } from "lib/validateSession";

import { getFollowers, getFollowing } from "services/social/get";
import { getMe } from "services/me/getMe";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  try {
    const session = await validateSession(req);
    const me = await getMe(session);
    const id = me?.id as string;

    if (req.method !== "GET") {
      throw new Error("Unsupported HTTP method");
    }

    const [following, followers] = await Promise.all([
      getFollowing(id),
      getFollowers(id),
    ]);
    res.status(200).json({ following, followers });
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
