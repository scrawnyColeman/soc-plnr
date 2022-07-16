import React from "react";
import { useAlert } from "src/hooks/context";

import { AlertBar } from "molecules";
import { Header } from "organisms";

export type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  className,
}) => {
  const { alertState, clearAlert } = useAlert();

  return (
    <>
      <Header />
      <div className={`bg-slate-800 ${className}`}>{children}</div>

      <AlertBar
        type={alertState?.type}
        message={alertState?.text}
        onClick={clearAlert}
      />
    </>
  );
};
export default Layout;
