import React, { FunctionComponent } from "react";
import { signIn } from "next-auth/react";

import { Button, FullScreen } from "atoms";

type ForbiddenProps = {};

const Forbidden: FunctionComponent<ForbiddenProps> = ({}) => (
  <FullScreen>
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
      <h3 className="text-purple-50">You need to log in to view this page</h3>
      <Button onClick={() => signIn("google")} variant="GOOGLE_SSO" />
    </div>
  </FullScreen>
);

export default Forbidden;
