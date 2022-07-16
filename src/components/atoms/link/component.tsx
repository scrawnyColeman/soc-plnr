import Link, { LinkProps } from "next/link";
import React, { FunctionComponent } from "react";

export type CustomLinkProps = LinkProps & {
  isActive: (arg: string) => boolean;
  text: string;
};

const CustomLink: FunctionComponent<CustomLinkProps> = ({
  isActive,
  text,
  href,
  ...linkProps
}) => (
  <Link href={href} {...linkProps}>
    <a
      className={`hover:text-purple-700 ${
        isActive(href.toString()) ? "text-purple-300" : ""
      }`}
      data-active={isActive("/")}
    >
      {text}
    </a>
  </Link>
);

export default CustomLink;
