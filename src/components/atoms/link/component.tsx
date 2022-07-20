import React, { FunctionComponent } from "react";
import Link, { LinkProps } from "next/link";

export type CustomLinkProps = LinkProps & {
  isActive?: (arg: string) => boolean;
  text: string;
  className?: string;
};

const CustomLink: FunctionComponent<CustomLinkProps> = ({
  isActive,
  text,
  href,
  className,
  ...linkProps
}) => (
  <Link href={href} {...linkProps}>
    <a
      className={`
        hover:text-purple-400
        ${isActive?.(href.toString()) ? "text-purple-200" : ""}
        ${className}
      `}
    >
      {text}
    </a>
  </Link>
);

export default CustomLink;
