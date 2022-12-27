import React, { FC } from "react";
import classNames from "classnames";

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
    </div>
  );
};

Alert.defaultProps = {
  type: "default",
};
