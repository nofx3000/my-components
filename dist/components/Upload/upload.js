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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import axios from "axios";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";
import Dragger from "../Upload/dragger";
var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, onError = props.onError, onProgress = props.onProgress, onSuccess = props.onSuccess, beforeUpload = props.beforeUpload, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, customFormData = props.customFormData, withCredentials = props.withCredentials, multiple = props.multiple, accept = props.accept, children = props.children, drag = props.drag;
    var _a = useState(defaultFileList ? defaultFileList : []), fileList = _a[0], setFileList = _a[1];
    var inputRef = useRef(null);
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (files) {
            // 不能直接将转换数组赋值给files  ❌files = Array.from(files)
            // 在转换中可能会丢失一些属性导致类型报错
            var postFiles = Array.from(files);
            postFiles.forEach(function (file) {
                handlePost(file);
            });
        }
    };
    var handleClick = function () {
        var _a;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var updateFile = function (fileWantToUpdate, updateContent) {
        setFileList(function (prevList) {
            console.log(prevList);
            return prevList.map(function (file) {
                if (file.uid === fileWantToUpdate.uid) {
                    return __assign(__assign({}, file), updateContent);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handlePost = function (file) {
        if (beforeUpload && !beforeUpload(file)) {
            return;
        }
        var _file = {
            uid: "".concat(Date()).concat(file.name),
            name: file.name,
            size: file.size,
            raw: file,
            percentage: 0,
            status: "ready",
        };
        // setFileList([_file, ...fileList]);
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var data = new FormData();
        data.append(name || "file", file);
        if (customFormData) {
            for (var key in customFormData) {
                data.append(key, customFormData[key]);
            }
        }
        axios
            .post(action, data, {
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var percentage = e.total
                    ? Math.round((e.loaded * 100) / e.total) || 0
                    : 100;
                if (percentage < 100) {
                    updateFile(_file, { percentage: percentage, status: "uploading" });
                    onProgress && onProgress(percentage, _file);
                }
            },
        })
            .then(function (res) {
            console.log(res);
        })
            .then(function (res) {
            console.log("upload success");
            updateFile(_file, { status: "success", response: res });
            if (onSuccess) {
                onSuccess(res, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        })
            .catch(function (err) {
            console.log("upload error");
            updateFile(_file, { status: "error", error: err });
            if (onError) {
                onError(err, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        });
    };
    return (_jsxs("div", __assign({ className: "viking-upload-component" }, { children: [_jsxs("div", __assign({ className: "viking-upload-input", style: { display: "inline-block" }, onClick: handleClick }, { children: [drag ? (_jsx(Dragger, __assign({ onFile: function (files) {
                            var postFiles = Array.from(files);
                            postFiles.forEach(function (file) {
                                handlePost(file);
                            });
                        } }, { children: children }))) : (children), _jsx("input", { type: "file", style: { display: "none" }, ref: inputRef, onChange: handleFileChange, multiple: multiple, accept: accept })] })), _jsx("ul", __assign({ className: "viking-upload-list" }, { children: fileList.map(function (file) {
                    return (_jsxs("li", __assign({ className: "viking-upload-list-item" }, { children: [_jsx("span", __assign({ className: "file-name file-name-".concat(file.status) }, { children: file.name })), _jsxs("span", __assign({ className: "file-status" }, { children: [(file.status === "uploading" || file.status === "ready") && (_jsx(Icon, { icon: "spinner", spin: true, theme: "primary" })), file.status === "success" && (_jsx(Icon, { icon: "check-circle", theme: "success" })), file.status === "error" && (_jsx(Icon, { icon: "times-circle", theme: "danger" }))] })), _jsx("span", __assign({ className: "file-actions" }, { children: _jsx(Icon, { icon: "times", onClick: function () {
                                        onRemove && onRemove(file);
                                        setFileList(function (prevList) {
                                            return prevList.filter(function (item) { return item.uid !== file.uid; });
                                        });
                                    } }) })), file.status === "uploading" && (_jsx(Progress, { percentage: file.percentage || 0, theme: "primary", showText: true }))] }), file.uid));
                }) }))] })));
};
export default Upload;
