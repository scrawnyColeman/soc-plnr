import React, {
  DetailedHTMLProps,
  FunctionComponent,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

import { TextArea, Label } from "atoms";

export type LabelledTextAreaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  id: string;
  children: ReactNode;
  wrapperClassName?: string;
};

const LabelledTextArea: FunctionComponent<LabelledTextAreaProps> = ({
  id,
  children,
  wrapperClassName,
  ...TextAreaProps
}) => {
  return (
    <div className={`flex flex-col gap-1 justify-center ${wrapperClassName}`}>
      <Label htmlFor={id}>{children}</Label>
      <TextArea id={id} {...TextAreaProps} />
    </div>
  );
};

export default LabelledTextArea;
