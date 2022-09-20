import React, { useState } from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/submenu";
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const App: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Menu
          className="myMenuClass"
          onSelect={(index) => {
            alert(index);
          }}
          // mode="vertical"
          // defaultOpen={["3"]}
        >
          <MenuItem>active</MenuItem>
          <MenuItem disabled>disabled</MenuItem>
          <MenuItem>ccc</MenuItem>
          <SubMenu title="sub">
            <MenuItem>a</MenuItem>
            <MenuItem disabled>b</MenuItem>
            <MenuItem>c</MenuItem>
          </SubMenu>
        </Menu>

        <Button
          onClick={() => {
            setShow(!show);
          }}
        >
          show/hide
        </Button>
        <Transition in={show} animation="zoom-in-left" timeout={300}>
          <Button>ssssss</Button>
        </Transition>
        {/* <Button
          buttonType={ButtonType.Default}
          onClick={() => {
            console.log(1111);
          }}
        >
          default
        </Button>
        <Button buttonType={ButtonType.Primary} size={ButtonSize.Large}>
          primary
        </Button>
        <Button buttonType={ButtonType.Danger} size={ButtonSize.Small}>
          primary
        </Button>
        <Button
          buttonType={ButtonType.Link}
          href="http://www.baidu.com"
          target="_blank"
        >
          link
        </Button>
        <Button buttonType={ButtonType.Link} href="http://www.sss.com" disabled>
          disabled link
        </Button> */}
      </header>
    </div>
  );
};

export default App;
