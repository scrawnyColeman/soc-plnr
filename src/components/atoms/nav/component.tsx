import React, { FunctionComponent, HTMLAttributes } from "react";

export type NavProps = HTMLAttributes<HTMLElement> & {};

const Nav: FunctionComponent<NavProps> = ({
  className,
  children,
  ...navProps
}) => (
  <nav
    {...navProps}
    className={`w-100 flex justify-between items-center p-3 bg-slate-700 text-violet-100 ${className}`}
  >
    {children}
  </nav>
);

export default Nav;
