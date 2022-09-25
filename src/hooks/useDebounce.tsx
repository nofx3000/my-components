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

function useDebounce(value: any, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
