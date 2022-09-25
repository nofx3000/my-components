import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button, { ButtonSize, ButtonType, ButtonProps } from "./button";

export default {
  title: "myButton",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}>123</Button>
);

export const ssssc = Template.bind({});

ssssc.args = {
  buttonType: "primary",
  size: "lg",
  /*👇 The args you need here will depend on your component */
};
