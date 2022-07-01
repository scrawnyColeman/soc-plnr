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
    className={`border-4 border-solid border-gray-700 rounded-lg ${className}`}
  >
    {children}
  </div>
);

export default Card;
