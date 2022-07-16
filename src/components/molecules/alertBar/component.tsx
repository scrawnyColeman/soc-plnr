import React, { FunctionComponent } from "react";
import { Toast } from "atoms";
import { AlertType } from "src/context";
import { ErrorIcon, SuccessIcon } from "components/icons";

type Props = {
  message?: string;
  type?: keyof typeof AlertType;
  onClick: () => void;
};

const icons: { [key in AlertType]: FunctionComponent } = {
  ERROR: ErrorIcon,
  SUCCESS: SuccessIcon,
};

const AlertBar: FunctionComponent<Props> = ({
  onClick,
  message,
  type,
}: Props) => {
  if (message && type) {
    const colour = type === "SUCCESS" ? "green" : "red";
    const Icon = icons[type];

    return (
      <Toast onClick={onClick}>
        <div
          className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg text-${colour}-500 bg-${colour}-100`}
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
