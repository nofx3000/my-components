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
import { useState, useEffect, useRef, } from "react";
import Input from "../Input/input";
import Transition from "../Transition/transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";
export var AutoComplete = function (props) {
    var getAutoCompeleteChoiese = props.getAutoCompeleteChoiese, onSelect = props.onSelect, customRender = props.customRender, value = props.value, resProps = __rest(props, ["getAutoCompeleteChoiese", "onSelect", "customRender", "value"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), results = _b[0], setResults = _b[1];
    var _c = useState(false), showLoading = _c[0], setShowLoading = _c[1];
    var _d = useState(false), showDropdown = _d[0], setShowDropdown = _d[1];
    var _e = useState(-1), highlightIndex = _e[0], setHighlightIndex = _e[1];
    var debouncedValue = useDebounce(inputValue, 300);
    var searchTrigger = useRef(false);
    var divRef = useRef();
    useClickOutside(divRef, function () {
        setResults([]);
    });
    // get autocomplete choices
    useEffect(function () {
        if (debouncedValue && searchTrigger.current) {
            // 先清空结果数组
            // 踩坑： 如果setResults([])放在if判断外
            // 会导致任何输入都会执行setResults([])
            // 清空input框时列表会先缩到最小然后执行动画
            // 使动画看不出效果
            setResults([]);
            var choices = getAutoCompeleteChoiese(debouncedValue);
            if (choices instanceof Promise) {
                setShowLoading(true);
                choices.then(function (res) {
                    setShowLoading(false);
                    setResults(res);
                    if (res.length > 0) {
                        setShowDropdown(true);
                    }
                });
            }
            else {
                setResults(choices);
                if (choices.length > 0) {
                    setShowDropdown(true);
                }
            }
        }
        else {
            setShowDropdown(false);
        }
    }, [debouncedValue, getAutoCompeleteChoiese]);
    var handleInputChange = function (e) {
        console.log("showLoading:", showLoading);
        // 踩坑： if和setResults中不能使用inputValue，因为setInputValue为异步更新
        var value = e.target.value.trim();
        setInputValue(value);
        searchTrigger.current = true;
        setHighlightIndex(-1);
    };
    var handleClickResult = function (item) {
        var _a;
        searchTrigger.current = false;
        setInputValue((_a = item.value) === null || _a === void 0 ? void 0 : _a.trim());
        setShowDropdown(false);
        onSelect && onSelect(item);
    };
    var highlight = function (index) {
        console.log(index);
        if (index < 0) {
            index = 0;
        }
        if (index >= results.length) {
            index = results.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.key) {
            case "ArrowDown":
                highlight(highlightIndex + 1);
                break;
            case "ArrowUp":
                e.preventDefault();
                highlight(highlightIndex - 1);
                break;
            case "Escape":
                setShowDropdown(false);
                break;
            case "Enter":
                if (results[highlightIndex]) {
                    handleClickResult(results[highlightIndex]);
                }
                break;
            default:
                break;
        }
    };
    var renderList = function () {
        return (_jsx(Transition, __assign({ in: showDropdown || showLoading, animation: "zoom-in-top", timeout: 300, onExited: function () {
                console.log("out!!!");
                setResults([]);
            } }, { children: _jsxs("ul", __assign({ className: "viking-suggestion-list" }, { children: [showLoading && (_jsx("div", __assign({ className: "suggstions-loading-icon" }, { children: "loading..." }))), results.map(function (res, index) {
                        var classes = classNames("suggestion-item ", {
                            "is-active": highlightIndex === index,
                        });
                        return (_jsx("li", __assign({ className: classes, onClick: function () {
                                handleClickResult(res);
                            } }, { children: customRender ? customRender(res) : res.value }), index));
                    })] })) })));
    };
    return (_jsxs("div", __assign({ className: "viking-auto-complete", ref: divRef }, { children: [_jsx(Input, __assign({ value: inputValue, onChange: handleInputChange, onKeyDown: handleKeyDown }, resProps)), renderList()] })));
};
export default AutoComplete;
