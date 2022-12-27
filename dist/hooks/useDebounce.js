// import React, { useEffect, useState } from "react";
// export default function useDebounce(inputValue: string, time: number = 300) {
//   const [debouncedValue, setDebouncedValue] = useState(inputValue);
//   console.log(1);
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       console.log(2);
//       setDebouncedValue(inputValue);
//     }, time);
//     return () => {
//       console.log(3);
//       clearTimeout(timer);
//     };
//   }, [inputValue, time]);
//   console.log(4);
//   return debouncedValue;
// }
import { useState, useEffect } from "react";
function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}
export default useDebounce;
