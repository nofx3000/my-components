import { InputHTMLAttributes, ReactElement, FC } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    disabled?: boolean;
    size?: "lg" | "sm";
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    icon?: IconProp;
}
export declare const Input: FC<InputProps>;
export default Input;
