import React, { FunctionComponent, ReactNode } from "react";

export type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: FunctionComponent<CardProps> = ({ children, className = "" }) => (
  <div
    className={`p-3 rounded-lg shadow-lg bg-white min-w-64 max-w-full overflow-auto ${className}`}
  >
    {children}
  </div>
);

export default Card;
