import React, { FunctionComponent, MouseEventHandler, ReactNode } from "react";
import { Button } from "../button";

export type ToastProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
};

const Toast: FunctionComponent<ToastProps> = ({ onClick, children }) => (
  <div
    className="flex items-center justify-between w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow fixed bottom-4 left-4"
    role="alert"
  >
    {children}
    <Button
      type="button"
      hierarchy="TOAST"
      size="SM"
      isRounded
      aria-label="Close"
      onClick={onClick}
    >
      <span className="sr-only">Close</span>
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </Button>
  </div>
);

export default Toast;
