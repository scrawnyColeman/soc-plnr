import React from "react";

export type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  className,
}) => (
  <div
    className={`bg-slate-400 fixed top-0 left-0 right-0 bottom-0 ${className}`}
  >
    {children}
  </div>
);

export default Layout;
