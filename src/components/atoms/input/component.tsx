import React, {
  DetailedHTMLProps,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const Input: FunctionComponent<InputProps> = ({ className, ...inputProps }) => {
  return (
    <input
      className={`w-full p-2 rounded-md border border-solid border-b-neutral-800 text-purple-600 ${inputProps}`}
      {...inputProps}
    />
  );
};

export default Input;
