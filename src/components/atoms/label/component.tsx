import React, { FunctionComponent, LabelHTMLAttributes } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {};

const Label: FunctionComponent<LabelProps> = ({ className, ...labelProps }) => (
  <label className={`text-purple-200 ${className}`} {...labelProps} />
);

export default Label;
