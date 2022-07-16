import { NextRouter } from "next/router";

export const isActive = (router: NextRouter, pathname: string) => {
  return router.pathname === pathname;
};
