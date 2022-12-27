import { CSSProperties, FC } from "react";
import { ThemeProps } from "../Icon/icon";
interface progressProps {
    percentage: number;
    theme?: ThemeProps;
    showText?: boolean;
    barHeight?: number;
    styles?: CSSProperties;
}
export declare const Progress: FC<progressProps>;
export default Progress;
