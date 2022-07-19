import React, { FunctionComponent } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

import { Toast } from "atoms";
import { AlertType } from "src/context";

type Props = {
  message?: string;
  type?: keyof typeof AlertType;
  onClick: () => void;
};

const icons: { [key in AlertType]: FunctionComponent } = {
  ERROR: FaTimes,
  SUCCESS: FaCheck,
};

const AlertBar: FunctionComponent<Props> = ({ onClick, message, type }) => {
  if (message && type) {
    const Icon = icons[type];

    return (
      <Toast onClick={onClick}>
        <div
          className={`flex items-center justify-center w-8 h-8 rounded-lg 
          ${
            type === "SUCCESS"
              ? "text-green-500 bg-green-100"
              : "text-red-500 bg-red-100"
          }`}
        >
          <Icon />
        </div>

        <div className="ml-3 text-sm font-normal overflow-hidden overflow-ellipsis">
          {typeof message === "string" && message.length > 100
            ? `${message.slice(0, 100)}…`
            : message}
        </div>
      </Toast>
    );
  }

  return null;
};

export default AlertBar;
