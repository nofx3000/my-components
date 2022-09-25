import React, { useState } from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/submenu";
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";
import AutoComplete, {
  DataSourceType,
} from "./components/AutoComplete/autoComplete";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const data = [
  { value: "a", id: "1" },
  { value: "b", id: "2" },
  { value: "ab", id: "3" },
  { value: "ac", id: "4" },
];

interface DataInterface {
  value: string;
  id: string;
}
const App: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <header className="App-header"></header>
    </div>
  );
};

export default App;
