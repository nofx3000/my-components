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
import classnames from "classnames";
var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), isDragOver = _a[0], setIsDragOver = _a[1];
    var classes = classnames("viking-uploader-dragger", {
        "is-dragover": isDragOver,
    });
    var handleDrag = function (e, isDragOver) {
        e.preventDefault();
        setIsDragOver(isDragOver);
    };
    var handleDrop = function (e) {
        e.preventDefault();
        setIsDragOver(false);
        onFile(e.dataTransfer.files);
    };
    return (_jsx("div", __assign({ className: classes, onDragOver: function (e) {
            handleDrag(e, true);
        }, onDragLeave: function (e) {
            handleDrag(e, false);
        }, onDrop: function (e) {
            handleDrop(e);
        } }, { children: children })));
};
export default Dragger;
