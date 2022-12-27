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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from "classnames";
export var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, prepend = props.prepend, append = props.append, icon = props.icon, restProps = __rest(props, ["disabled", "size", "prepend", "append", "icon"]);
    var classes = classNames("viking-input-wrapper", (_a = {},
        _a["input-size-".concat(size)] = size,
        _a["input-group"] = prepend || append,
        _a["input-group-prepend"] = !!prepend,
        _a["input-group-append"] = !!append,
        _a));
    if ("value" in props) {
        delete restProps.defaultValue;
    }
    var fixControlledValue = function (value) {
        if (typeof value === "undefined" || value === null) {
            return "";
        }
        return value;
    };
    if ("value" in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (_jsxs("div", __assign({ className: classes }, { children: [prepend && _jsx("div", __assign({ className: "viking-input-group-prepend" }, { children: prepend })), _jsx("input", __assign({ className: "viking-input-inner", disabled: disabled }, restProps)), append && _jsx("div", __assign({ className: "viking-input-group-append" }, { children: append }))] })));
};
export default Input;
