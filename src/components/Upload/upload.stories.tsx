import Upload from "../Upload/upload";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/button";
library.add(fas);
export default {
  title: "myUpload",
  component: Upload,
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args) => (
  <Upload {...args}>{/* <Button>upload</Button> */}</Upload>
);

export const upload = Template.bind({});

upload.args = {
  // action: "http://localhost:3000/api/upload/avatar/",
  action: "http://jsonplaceholder.typicode.com/posts",
  defaultFileList: [
    { uid: "1", name: "1", size: 1, status: "ready", percentage: 10 },
    { uid: "2", name: "2", size: 1, status: "uploading", percentage: 10 },
    { uid: "3", name: "3", size: 1, status: "success", percentage: 10 },
    { uid: "4", name: "4", size: 1, status: "error", percentage: 10 },
  ],
  customFormData: { a: 1, b: 2 },
  multiple: true,
  // accept: ".png",
  beforeUpload: (file) => {
    // if (file.size > 200) {
    //   console.log("blocked");
    //   return false;
    // }
    return true;
  },
  onProgress: (percentage, file) => {},
  onSuccess: () => {},
  drag: true,
  /*👇 The args you need here will depend on your component */
};
