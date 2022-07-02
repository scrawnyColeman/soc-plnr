import React from "react";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FunctionComponent<CardProps> = ({
  children,
  className = "",
}) => (
  <div
    className={`p-3 rounded-lg shadow-lg bg-white min-w-64 max-w-full overflow-auto ${className}`}
  >
    {children}
  </div>
);

export default Card;
