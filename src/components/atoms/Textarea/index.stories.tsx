import React from "react";
import { css } from "@emotion/react";
import { COLORS } from "@/styles/variables/Colors";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Textarea } from ".";

export default {
  title: `atoms/${Textarea.name}`,
  component: Textarea,
  argTypes: {
    name: { control: "text" },
    placeholder: { control: "text" },
    colorType: { control: "select" },
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} css={initialStyle} />
);

export const DefaultPattern = Template.bind({});
const initialStyle = css`
  font-size: 15px;
  color: ${COLORS.BASECOLOR};
`;

DefaultPattern.args = {
  name: "제목",
  colorType: "default",
  placeholder: "내용을 입력해주세요",
};

export const OtherPattern = Template.bind({});
OtherPattern.args = {
  colorType: "gray",
  placeholder: "placeholder",
};
