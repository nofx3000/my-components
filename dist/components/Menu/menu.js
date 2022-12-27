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
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState, createContext } from "react";
import classNames from "classnames";
export var MenuContext = createContext({
    index: "0",
    mode: "horizontal",
});
export var Menu = function (props) {
    var defaultIndex = props.defaultIndex, mode = props.mode, className = props.className, children = props.children, onSelect = props.onSelect, style = props.style, defaultOpen = props.defaultOpen;
    var _a = useState(defaultIndex), currentActive = _a[0], setCurrentActive = _a[1];
    var classes = classNames("viking-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    var handleClick = function (index) {
        setCurrentActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode: mode,
        defaultOpen: defaultOpen,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            // React.FunctionComponentElement ??? ReactComponentElement ??? React.FunctionComponent
            var childElement = child;
            if (childElement.type.displayName === "MenuItem" ||
                childElement.type.displayName === "SubMenu") {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (_jsx("ul", __assign({ className: classes, style: style, "data-testid": "test-menu" }, { children: _jsx(MenuContext.Provider, __assign({ value: passedContext }, { children: renderChildren() })) })));
};
Menu.defaultProps = {
    defaultIndex: "0",
    mode: "horizontal",
    defaultOpen: [],
};
export default Menu;
