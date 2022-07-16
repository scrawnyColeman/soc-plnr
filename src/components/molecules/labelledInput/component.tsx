import React, {
  DetailedHTMLProps,
  FunctionComponent,
  InputHTMLAttributes,
  ReactNode,
} from "react";

import { Input, Label } from "atoms";

export type LabelledInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  id: string;
  children: ReactNode;
  wrapperClassName?: string;
};

const LabelledInput: FunctionComponent<LabelledInputProps> = ({
  id,
  children,
  wrapperClassName,
  ...inputProps
}) => {
  return (
    <div className={`flex flex-col gap-1 justify-center ${wrapperClassName}`}>
      <Label htmlFor={id}>{children}</Label>
      <Input id={id} {...inputProps} />
    </div>
  );
};

export default LabelledInput;
