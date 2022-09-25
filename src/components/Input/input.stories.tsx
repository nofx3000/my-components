import React, { useState } from "react";
import Button from "../Button/button";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input, { InputProps } from "./input";

export default {
  title: "myInput",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args}></Input>
);

export const input1 = Template.bind({});

input1.args = {
  prepend: "http://",
  append: ".com",
  placeholder: "hacker",
  size: "lg",
  /*👇 The args you need here will depend on your component */
};

const ControlledInput = () => {
  const [val, setVal] = useState("");
  return (
    <Input
      defaultValue="1"
      value={val}
      onChange={(e) => setVal(e.target.value)}
    ></Input>
  );
};

const Template2: ComponentStory<typeof Input> = (args) => <ControlledInput />;
export const input2 = Template2.bind({});
