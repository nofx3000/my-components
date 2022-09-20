import React, { useState, useContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import { CSSTransition } from "react-transition-group";
export interface SubMenuProps {
  index?: string;
  className?: string;
  title: string;
  children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, className, title, children } = props;
  const menuContext = useContext(MenuContext);
  const openedSubMenus = menuContext.defaultOpen as Array<string>;
  const isOpend =
    index && menuContext.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setMenuOpen] = useState(isOpend);
  const classes = classNames("menu-item submenu-item", className, {
    // 如果submenu中的item被选中，submenu也高亮
    "is-active": parseInt(menuContext.index) === parseInt(index as string),
    "is-opened": menuOpen,
    "is-vertical": menuContext.mode === "vertical",
  });

  let timer: any;
  const hoverEvents =
    menuContext.mode === "horizontal"
      ? {
          // use e: React.MouseEvent, instead e: MouseEvent
          onMouseEnter: (e: React.MouseEvent) => {
            clearTimeout(timer);
            e.preventDefault();
            timer = setTimeout(() => {
              setMenuOpen(true);
            }, 300);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            clearTimeout(timer);
            e.preventDefault();
            timer = setTimeout(() => {
              setMenuOpen(false);
            }, 300);
          },
        }
      : {};

  const clickEvents =
    menuContext.mode === "vertical"
      ? {
          onClick: (e: React.MouseEvent) => {
            e.preventDefault();
            setMenuOpen(!menuOpen);
          },
        }
      : {};
  const subMenuClasses = classNames("viking-submenu", {
    "menu-opened": menuOpen,
  });
  const renderChildren = () => {
    const childrenComponent = React.Children.map(
      children,
      (child, childIndex) => {
        // React.FunctionComponentElement ??? ReactComponentElement ??? React.FunctionComponent
        const childElement =
          child as React.FunctionComponentElement<MenuItemProps>;
        if (childElement.type.displayName === "MenuItem") {
          return React.cloneElement(childElement, {
            index: index + "-" + childIndex,
          });
        } else {
          console.error(
            "Warning: Menu has a child which is not a MenuItem component"
          );
        }
      }
    );
    return (
      <CSSTransition
        in={menuOpen}
        // ⚠️是className's' 不是 className
        classNames="zoom-in-top"
        timeout={300}
        appear
        unmountOnExit
      >
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </CSSTransition>
    );
  };

  return (
    <li className={classes} {...hoverEvents} {...clickEvents}>
      <div className="submenu-title">
        {title}
        <Icon icon="angle-down" className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
