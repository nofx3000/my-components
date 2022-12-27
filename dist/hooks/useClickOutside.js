import { useEffect } from "react";
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
function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener("click", listener);
        return function () {
            document.removeEventListener("click", listener);
        };
    }, [ref, handler]);
}
export default useClickOutside;
