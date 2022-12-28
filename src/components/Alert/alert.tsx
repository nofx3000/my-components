import React, { FC } from "react";
import classNames from "classnames";
import Icon from "../Icon";

export type AlertType = "success" | "default" | "warning" | "danger";
export interface AlertProps {
  title: string;
  description?: string;
  type?: AlertType;
  onClose?: () => void;
  closable?: boolean;
}

export const Alert: FC<AlertProps> = (props) => {
  const { title, description, type, onClose, closable } = props;
  const classes = classNames("alert", {
    [`alert-${type}`]: type,
  });
  return (
    <div className={classes}>
      <p>{title}</p>
      <span>{description}</span>
      {closable && (
        <Icon
          icon="xmark"
          theme="light"
          className="alert-xmark"
          onClick={() => {
            onClose && onClose();
          }}
        ></Icon>
      )}
    </div>
  );
};

Alert.defaultProps = {
  type: "default",
  closable: true,
};
