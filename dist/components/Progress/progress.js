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
export var Progress = function (props) {
    var percentage = props.percentage, theme = props.theme, showText = props.showText, barHeight = props.barHeight, styles = props.styles;
    return (_jsx("div", __assign({ className: "viking-progress-bar", style: styles }, { children: _jsx("div", __assign({ className: "viking-progress-bar-outer", style: { height: "".concat(barHeight, "px") } }, { children: _jsx("div", __assign({ className: "viking-progress-bar-inner color-".concat(theme), style: {
                    width: "".concat(percentage, "%"),
                } }, { children: showText && _jsx("span", __assign({ className: "inner-text" }, { children: percentage })) })) })) })));
};
Progress.defaultProps = {
    theme: "primary",
    showText: true,
    barHeight: 15,
};
export default Progress;
