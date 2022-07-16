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
};

const LabelledInput: FunctionComponent<LabelledInputProps> = ({
  id,
  children,
  ...inputProps
}) => {
  return (
    <div className="flex flex-col gap-1 justify-center my-2">
      <Label htmlFor={id}>{children}</Label>
      <Input id={id} {...inputProps} />
    </div>
  );
};

export default LabelledInput;
