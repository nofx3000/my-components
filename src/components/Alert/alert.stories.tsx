import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Alert, AlertType, AlertProps } from "./alert";

export default {
  title: "myAlert",
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => (
  <Alert {...args}></Alert>
);

export const alert = Template.bind({});

alert.args = {
  title: "this is alert",
  type: "default",
  /*👇 The args you need here will depend on your component */
};
