import React, { useState } from "react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./submenu";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "myMenu",
  component: Menu,
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>1</MenuItem>
    <MenuItem>2</MenuItem>
    <SubMenu title="submeue">
      <MenuItem>s1</MenuItem>
      <MenuItem>s2</MenuItem>
      <MenuItem>s3</MenuItem>
    </SubMenu>
  </Menu>
);

export const menu = Template.bind({});

menu.args = {
  onSelect: () => {
    console.log("menu clicked");
  },
  /*👇 The args you need here will depend on your component */
};

const Template2: ComponentStory<typeof MenuItem> = (args) => (
  <Menu>
    <MenuItem {...args}>1</MenuItem>
    <MenuItem>2</MenuItem>
  </Menu>
);

export const menuItem = Template2.bind({});

menuItem.args = {};
