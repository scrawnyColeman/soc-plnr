import React, { FunctionComponent } from "react";

import { Link } from "atoms";
import { PathNames } from "src/constants";

export type PreviewProps = {
  className?: string;
  pathname: keyof typeof PathNames;
  identifier: string;
  imagePath?: string;
  title: string;
};

const Preview: FunctionComponent<PreviewProps> = ({
  className = "",
  pathname,
  identifier,
  imagePath,
  title,
}) => {
  const path = `${PathNames[pathname]}/${identifier}`;

  return (
    <div
      className={`p-3 rounded-lg shadow-lg bg-white h-auto  flex justify-between   ${className}`}
    >
      <div
        className={`
            flex
            ${imagePath && "gap-2"}
            items-center
            w-[calc(100%-56px)]
        `}
      >
        {imagePath && (
          <img
            className="rounded-full"
            src={imagePath}
            alt={title}
            width={48}
            height={48}
          />
        )}
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {title}
        </span>
      </div>
      <Link
        href={path}
        text="View"
        className="py-1 px-2 flex items-center bg-purple-100 rounded-md"
      />
    </div>
  );
};

export default Preview;
