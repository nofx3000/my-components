import React, { useState } from "react";
import { AutoComplete, DataSourceType } from "./autoComplete";
import { ComponentStory, ComponentMeta } from "@storybook/react";

export default {
  title: "myAutoComplete",
  component: AutoComplete,
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<typeof AutoComplete> = (args) => (
  <AutoComplete {...args}></AutoComplete>
);

// const data = ["aa", "bb", "ab", "cc", "abb", "abc", "bc", "ac"];
interface DataInterface {
  login: string;
  id: string;
}

const data = [
  { value: "a", id: "1" },
  { value: "b", id: "2" },
  { value: "ab", id: "3" },
  { value: "ac", id: "4" },
];

export const input1 = Template.bind({});

const getAutoCompeleteChoiese = (keyword: string) => {
  return data.filter((item) => {
    return item.value.includes(keyword);
  });
};

const promiseGetAutoCompeleteChoiese = (keyword: string) => {
  console.log("sending");
  return fetch(`https://api.github.com/search/users?q=${keyword}`)
    .then((res) => {
      //   console.log(res.json());
      return res.json();
    })
    .then((res) => {
      // 防止报错
      return res.items
        ? res.items.map((item: any) => {
            return { value: item.login, ...item };
          })
        : [];
    });
};
// fetch(`https://api.github.com/search/users?q=${"a"}`)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

input1.args = {
  getAutoCompeleteChoiese: promiseGetAutoCompeleteChoiese,
  onSelect: (item: DataSourceType<DataInterface>) => {
    console.log(item.login + " is selected");
  },
  customRender: (item: DataSourceType<DataInterface>) => {
    return (
      <h2>
        {item.login}---{item.id}
      </h2>
    );
  },
};
