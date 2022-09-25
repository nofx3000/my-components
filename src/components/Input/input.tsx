import React, {
  InputHTMLAttributes,
  ReactElement,
  FC,
  ChangeEvent,
} from "react";
import classNames from "classnames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// Omit 负责忽略某一冲突的属性
// https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  disabled?: boolean;
  size?: "lg" | "sm";
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  icon?: IconProp;
  //   onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, prepend, append, icon, ...restProps } = props;
  const classes = classNames("viking-input-wrapper", {
    [`input-size-${size}`]: size,
    "input-group": prepend || append,
    "input-group-prepend": !!prepend,
    "input-group-append": !!append,
  });
  if ("value" in props) {
    delete restProps.defaultValue;
  }
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={classes}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      <input
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      ></input>
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
