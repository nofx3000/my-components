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
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);
var data = [
    { value: "a", id: "1" },
    { value: "b", id: "2" },
    { value: "ab", id: "3" },
    { value: "ac", id: "4" },
];
var App = function () {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (_jsx("div", __assign({ className: "App" }, { children: _jsx("header", { className: "App-header" }) })));
};
export default App;
