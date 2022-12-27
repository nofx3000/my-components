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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
/**
 * ## 第一个storybook生成的组件
 * @param props
 * @returns
 */
export var Button = function (props) {
    var _a;
    var buttonType = props.buttonType, disabled = props.disabled, size = props.size, children = props.children, href = props.href, 
    // 用户自定义的className
    className = props.className, restProps = __rest(props, ["buttonType", "disabled", "size", "children", "href", "className"]);
    var classes = classNames("btn", className, (_a = {},
        _a["btn-".concat(buttonType)] = buttonType,
        _a["btn-".concat(size)] = size,
        _a.disabled = buttonType === "link" && disabled,
        _a));
    if (buttonType === "link" && href) {
        return (_jsx("a", __assign({ className: classes, href: href }, restProps, { children: children })));
    }
    else {
        return (_jsx("button", __assign({ className: classes, disabled: disabled }, restProps, { children: children })));
    }
};
Button.defaultProps = {
    disabled: false,
    buttonType: "default",
};
export default Button;
