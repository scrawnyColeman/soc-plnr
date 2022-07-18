import React, { FunctionComponent, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
};

const FullScreen: FunctionComponent<ModalProps> = ({ children }) => (
  <div
    className="fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto bg-slate-800"
    aria-labelledby="fullScreen"
  >
    {children}
  </div>
);

export default FullScreen;
