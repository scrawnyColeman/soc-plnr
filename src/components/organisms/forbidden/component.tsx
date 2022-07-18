import React, { FunctionComponent } from "react";

import { FullScreen } from "atoms";

type ForbiddenProps = {};

const Forbidden: FunctionComponent<ForbiddenProps> = ({}) => {
  return <FullScreen>You need to log in to view this page</FullScreen>;
};

export default Forbidden;
