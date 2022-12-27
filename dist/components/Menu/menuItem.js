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
import { useContext } from "react";
import { MenuContext } from "./menu";
import classNames from "classnames";
export var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames("menu-item", className, {
        "is-disabled": disabled,
        "is-active": context.index === index,
    });
    var handleClick = function (e) {
        if (context.onSelect && !disabled && typeof index === "string") {
            e.stopPropagation();
            context.onSelect(index);
        }
    };
    return (_jsx("li", __assign({ className: classes, style: style, onClick: handleClick }, { children: children })));
};
MenuItem.displayName = "MenuItem";
export default MenuItem;
