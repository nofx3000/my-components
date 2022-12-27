import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, FC } from "react";
export declare type ButtonType = "primary" | "default" | "danger" | "link";
export declare type ButtonSize = "lg" | "sm";
interface BaseButtonProps {
    /**
     * 用户自定义类名
     */
    className?: string;
    disabled?: boolean;
    href?: string;
    buttonType?: ButtonType;
    size?: ButtonSize;
    children: ReactNode;
}
declare type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * ## 第一个storybook生成的组件
 * @param props
 * @returns
 */
export declare const Button: FC<ButtonProps>;
export default Button;
