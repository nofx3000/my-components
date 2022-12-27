import react, { FC } from "react";
interface DraggerProps {
    onFile: (files: FileList) => void;
    children: react.ReactNode;
}
declare const Dragger: FC<DraggerProps>;
export default Dragger;
