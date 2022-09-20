import React, { CSSProperties, useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

type onSelect = (index: string) => void;
export interface MenuProps {
  defaultIndex?: string;
  mode?: "horizontal" | "vertical";
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  onSelect?: onSelect;
  defaultOpen?: Array<string>;
}

interface contextProps {
  index: string;
  onSelect?: onSelect;
  mode?: "horizontal" | "vertical";
  defaultOpen?: Array<string>;
}

export const MenuContext = createContext<contextProps>({
  index: "0",
  mode: "horizontal",
});

const Menu: React.FC<MenuProps> = (props) => {
  const {
    defaultIndex,
    mode,
    className,
    children,
    onSelect,
    style,
    defaultOpen,
  } = props;
  const [currentActive, setCurrentActive] = useState(defaultIndex);
  const classes = classNames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    setCurrentActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: contextProps = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpen,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // React.FunctionComponentElement ??? ReactComponentElement ??? React.FunctionComponent
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      if (
        childElement.type.displayName === "MenuItem" ||
        childElement.type.displayName === "SubMenu"
      ) {
        return React.cloneElement(childElement, { index: index.toString() });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpen: [],
};

export default Menu;
