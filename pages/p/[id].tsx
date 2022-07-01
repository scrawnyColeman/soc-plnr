// pages/p/[id].tsx
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";

type PostProps = typeof getServerSideProps & {};

const Post: React.FunctionComponent<PostProps> = (props) => {
  return <div>{JSON.stringify(props, null, 2)}</div>;
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: post ?? {},
  };
};
