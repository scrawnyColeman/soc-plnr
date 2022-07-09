import { Header } from "components";
import ErrorBar from "components/error/component";
import React from "react";
import { useAlert } from "src/hooks/context";

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
      <div className={`bg-slate-800 ${className}`}>
        {
          /* Content */
          children
        }
      </div>

      <ErrorBar
        type={alertState?.type || "error"}
        message={alertState?.text}
        onClose={clearAlert}
      />
    </>
  );
};
export default Layout;
