import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

import { FaGoogle } from "react-icons/fa";

import { Spinner } from "atoms";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  XOR<
    { variant: "GOOGLE_SSO" },
    {
      hierarchy?: keyof typeof Hierarchy;
      size?: keyof typeof Size;
      isRounded?: boolean;
      isLoading?: boolean;
    }
  >;

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
    "text-white bg-purple-600 hover:bg-purple-600/90 focus:ring-4 focus:outline-none focus:ring-purple-600/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-purple-600/55 ",
  TOAST:
    "bg-neutral-300 text-neutral-600 border border-solid border-neutral-600 hover:border-purple-700 hover:bg-purple-200 hover:text-purple-800",
};

const sizes: { [key in Size]: string } = {
  SM: "p-1",
  MD: "p-2",
  LG: "p-4",
};

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  hierarchy = "PRIMARY",
  size = "MD",
  isLoading = false,
  isRounded = false,
  variant,
  ...props
}) => {
  if (variant === "GOOGLE_SSO") {
    return (
      <button
        {...props}
        type="button"
        className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
      >
        <FaGoogle className="mr-2 -ml-1 w-4 h-4" />
        Sign in with Google
      </button>
    );
  }

  return (
    <button
      {...props}
      type="button"
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
};

export default Button;
