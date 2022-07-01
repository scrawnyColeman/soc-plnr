import type { GetStaticProps, NextPage } from "next";
import { HomeView } from "views";
import prisma from "../lib/prisma";

const Home: NextPage = (props) => {
  console.log({ props });
  return <HomeView />;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};
