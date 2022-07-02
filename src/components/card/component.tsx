import React from "react";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FunctionComponent<CardProps> = ({
  children,
  className = "",
}) => (
  <div className="flex">
    <div
      className={`block p-6 rounded-lg shadow-lg bg-white max-w-full overflow-auto ${className}`}
    >
      {children}
    </div>
  </div>
);

export default Card;
