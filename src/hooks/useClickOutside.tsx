import React, { useEffect, RefObject, useState } from "react";

/**
 * MY VERSION
 */
// export default function useClickOutside(ref: MutableRefObject<HTMLElement>) {
//   const [isIn, setIsIn] = useState(false);
//   const listener = (e: MouseEvent) => {
//     const _ref = ref as MutableRefObject<HTMLElement>;
//     setIsIn(_ref.current.contains(e.target as Node));
//   };
//   useEffect(() => {
//     document.addEventListener("click", listener);
//     return () => {
//       document.removeEventListener("click", listener);
//     };
//   }, [ref]);
//   return isIn;
// }

/**
 * VIKING VERSION
 */
function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("click", listener);
    return () => {
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}

export default useClickOutside;
