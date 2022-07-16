import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof Variants;
};

enum Variants {
  PRIMARY = "PRIMARY",
  TOAST = "TOAST",
}

const variants: { [key in Variants]: string } = {
  PRIMARY:
    "bg-neutral-50 text-neutral-600 border-none py-1 px-4 rounded-md hover:bg-purple-600 hover:text-purple-50 disabled:opacity-50",
  TOAST:
    "bg-neutral-50 text-neutral-600 border-none p-1 rounded-full hover:bg-purple-600 hover:text-purple-50",
};

const Spinner: FunctionComponent<ButtonProps> = ({
  children,
  className,
  variant = "PRIMARY",
  ...props
}) => (
  <button {...props} className={`${variants[variant]}  ${className}`}>
    {children}
  </button>
);

export default Spinner;
