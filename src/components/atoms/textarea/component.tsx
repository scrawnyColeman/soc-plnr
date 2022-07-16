import React, { FunctionComponent, TextareaHTMLAttributes } from "react";

export type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {};

const Input: FunctionComponent<InputProps> = ({ className, ...inputProps }) => {
  return (
    <textarea
      className={`w-full p-2 rounded-md text-purple-600 ${inputProps}`}
      {...inputProps}
    />
  );
};

export default Input;
