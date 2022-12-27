import React, { FC, CSSProperties } from "react";
export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
}
export declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
