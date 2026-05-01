import { COLORS } from "@/styles/variables/Colors";
import { css, SerializedStyles } from "@emotion/react";
import React, { ChangeEvent, FC } from "react";

type ColorTypes = "default" | "gray" | "navy";

interface PropTypes {
  placeholder: string;
  colorType?: ColorTypes;
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  _css?: SerializedStyles | SerializedStyles[];
  rows?: number;
}

export const Textarea: FC<PropTypes> = ({
  onChange,
  placeholder,
  colorType = "default",
  name,
  value,
  rows = 3,
  _css,
}) => {
  return (
    <textarea
      rows={rows}
      css={[initialStyle, colorType && TextareaStyles(colorType), _css]}
      onChange={onChange}
      name={name}
      value={value}
      placeholder={placeholder}
    />
  );
};

const initialStyle = css`
  width: 100%;
  max-width: 100%;
  padding: 10px;
  border-radius: 5px;
  line-height: 1.4;
  box-sizing: border-box;
  border: 1px solid ${COLORS.GRAY[2]};
`;

const TextareaStyles = (colorType: ColorTypes) => {
  switch (colorType) {
    case "default":
      return css`
        font-size: 15px;
        color: ${COLORS.BASECOLOR};
      `;
    case "gray":
      return css`
        font-size: 14px;
        color: ${COLORS.BASECOLOR};
        background-color: ${COLORS.GRAY[1]};
        border-color: ${COLORS.GRAY[2]};
      `;
  }
};
