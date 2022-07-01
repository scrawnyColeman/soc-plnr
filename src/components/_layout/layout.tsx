import { Header } from "components";
import React from "react";

export type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  className,
}) => (
  <>
    <Header />
    <div className={`bg-slate-800 ${className}`}>{children}</div>
  </>
);

export default Layout;
