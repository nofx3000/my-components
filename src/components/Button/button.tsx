import React from "react";
import classNames from "classnames";

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}
export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  href?: string;
  buttonType?: ButtonType;
  size?: ButtonSize;
  children: React.ReactNode;
}

// 合并自定的props和html默认的props
// & 代表 联合属性
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;
// 为避免button上一些属性a上没有，反之同样，需将这些props变为可选
// Partial<T>是一种Utility Types, https://www.typescriptlang.org/docs/handbook/utility-types.html
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
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
    disabled: buttonType === ButtonType.Link && disabled,
  });
  if (buttonType === ButtonType.Link && href) {
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
  buttonType: ButtonType.Default,
};

export default Button;
