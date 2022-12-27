var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
var SubMenu = function (props) {
    var index = props.index, className = props.className, title = props.title, children = props.children;
    var menuContext = useContext(MenuContext);
    var openedSubMenus = menuContext.defaultOpen;
    var isOpend = index && menuContext.mode === "vertical"
        ? openedSubMenus.includes(index)
        : false;
    var _a = useState(isOpend), menuOpen = _a[0], setMenuOpen = _a[1];
    var classes = classNames("menu-item submenu-item", className, {
        // 如果submenu中的item被选中，submenu也高亮
        "is-active": parseInt(menuContext.index) === parseInt(index),
        "is-opened": menuOpen,
        "is-vertical": menuContext.mode === "vertical",
    });
    var timer;
    var hoverEvents = menuContext.mode === "horizontal"
        ? {
            // use e: React.MouseEvent, instead e: MouseEvent
            onMouseEnter: function (e) {
                clearTimeout(timer);
                e.preventDefault();
                timer = setTimeout(function () {
                    setMenuOpen(true);
                }, 300);
            },
            onMouseLeave: function (e) {
                clearTimeout(timer);
                e.preventDefault();
                timer = setTimeout(function () {
                    setMenuOpen(false);
                }, 300);
            },
        }
        : {};
    var clickEvents = menuContext.mode === "vertical"
        ? {
            onClick: function (e) {
                e.preventDefault();
                setMenuOpen(!menuOpen);
            },
        }
        : {};
    var subMenuClasses = classNames("viking-submenu", {
        "menu-opened": menuOpen,
    });
    var renderChildren = function () {
        var childrenComponent = React.Children.map(children, function (child, childIndex) {
            // React.FunctionComponentElement ??? ReactComponentElement ??? React.FunctionComponent
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: index + "-" + childIndex,
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
        return (
        // <CSSTransition
        //   in={menuOpen}
        //   // ⚠️是className's' 不是 className
        //   classNames="zoom-in-top"
        //   timeout={300}
        //   appear
        //   unmountOnExit
        // >
        //   <ul className={subMenuClasses}>{childrenComponent}</ul>
        // </CSSTransition>
        _jsx(Transition, __assign({ in: menuOpen, 
            // ⚠️是className's' 不是 className
            classNames: "zoom-in-top", timeout: 300 }, { children: _jsx("ul", __assign({ className: subMenuClasses }, { children: childrenComponent })) })));
    };
    return (_jsxs("li", __assign({ className: classes }, hoverEvents, clickEvents, { children: [_jsxs("div", __assign({ className: "submenu-title" }, { children: [title, _jsx(Icon, { icon: "angle-down", className: "arrow-icon" })] })), renderChildren()] })));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
