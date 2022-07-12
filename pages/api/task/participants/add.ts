import { NextApiRequest, NextApiResponse } from "next";

import { validateSession } from "lib/validateSession";

import { getMe } from "src/services/me/getMe";
import { addParticipantByEmail } from "src/services/task/update";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  try {
    const session = await validateSession(req);
    const requester = await getMe(session);

    if (req.method !== "PUT") {
      throw new Error("Can only use PUT on this path");
    }

    const response = addParticipantByEmail({
      requesterId: requester?.id as string,
      participantEmail: req.body.email,
      taskStepId: req.body.taskStepId,
    });
    res.status(200).json(response);
  } catch (e) {
    const message = (e as Error).message;
    console.log({ message });
    res.status(500).json({
      message,
    });
  }
};

export default handler;
