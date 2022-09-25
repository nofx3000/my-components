import React, {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  ReactNode,
  FC,
} from "react";
import classNames from "classnames";

export type ButtonType = "primary" | "default" | "danger" | "link";
export type ButtonSize = "lg" | "sm";
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

// 合并自定的props和html默认的props
// & 代表 联合属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
// 为避免button上一些属性a上没有，反之同样，需将这些props变为可选
// Partial<T>是一种Utility Types, https://www.typescriptlang.org/docs/handbook/utility-types.html
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * ## 第一个storybook生成的组件
 * @param props
 * @returns
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    buttonType,
    disabled,
    size,
    children,
    href,
    // 用户自定义的className
    className,
    ...restProps
  } = props;
  const classes = classNames("btn", className, {
    [`btn-${buttonType}`]: buttonType,
    [`btn-${size}`]: size,
    disabled: buttonType === "link" && disabled,
  });
  if (buttonType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  buttonType: "default",
};

export default Button;
