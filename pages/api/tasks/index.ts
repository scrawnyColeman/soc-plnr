import { NextApiRequest, NextApiResponse } from "next";

import { getTasks } from "src/services/task";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log({ req });
  console.log({ res });

  try {
    if (req.method !== "GET") {
      throw new Error("Can only use GET on this path");
    }

    const response = await getTasks();
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
