import { COLORS } from "@/styles/variables/Colors";
import { css, SerializedStyles } from "@emotion/react";
import React, { ChangeEvent, FC } from "react";

type ColorTypes = "default" | "gray" | "navy";
type InputTypes = "text" | "password" | "number" | "email" | "url" | "tel" | "search" | "submit" | "reset" | "button" | "date" | "datetime-local" | "month" | "week" | "color";

interface PropTypes {
  placeholder: string;
  colorType?: ColorTypes;
  name: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: InputTypes;
  _css?: SerializedStyles | SerializedStyles[];
}

export const Input: FC<PropTypes> = ({
  onChange,
  placeholder,
  colorType = "default",
  name,
  value,
  type = "text",
  _css,
}) => {
  return (
    <input
      css={[initialStyle, colorType && InputStyles(colorType), _css]}
      onChange={onChange}
      name={name}
      value={value}
      type={type}
      placeholder={placeholder}
    />
  );
};

const initialStyle = css`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  line-height: 14px;
  box-sizing: border-box;
  border: 1px solid ${COLORS.GRAY[2]};
`;

const InputStyles = (colorType: ColorTypes) => {
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
