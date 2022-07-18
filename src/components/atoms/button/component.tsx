import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  hierarchy?: keyof typeof Hierarchy;
  size?: keyof typeof Size;
  isLoading?: boolean;
  isRounded?: boolean;
};

enum Hierarchy {
  PRIMARY = "PRIMARY",
  TOAST = "TOAST",
}

enum Size {
  SM = "SM",
  MD = "MD",
  LG = "LG",
}

const hierarchies: { [key in Hierarchy]: string } = {
  PRIMARY:
    "bg-neutral-50 text-neutral-600 border-none hover:bg-purple-600 hover:text-purple-50",
  TOAST:
    "bg-neutral-300 text-neutral-600 border border-solid border-neutral-600 hover:border-purple-700 hover:bg-purple-200 hover:text-purple-800",
};

const sizes: { [key in Size]: string } = {
  SM: "p-1",
  MD: "p-2",
  LG: "p-4",
};

const Spinner: FunctionComponent<ButtonProps> = ({
  children,
  className,
  hierarchy = "PRIMARY",
  size = "MD",
  isLoading = false,
  isRounded = false,
  ...props
}) => (
  <button
    {...props}
    className={`disabled:opacity-50
        ${hierarchies[hierarchy]}
        ${sizes[size]}
        ${className}
        ${isRounded ? "rounded-full" : "rounded-lg"}
    `}
  >
    {isLoading ? <Spinner /> : children}
  </button>
);

export default Spinner;
