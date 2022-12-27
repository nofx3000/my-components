import React, { FC, CSSProperties } from "react";
declare type onSelect = (index: string) => void;
export interface MenuProps {
    defaultIndex?: string;
    mode?: "horizontal" | "vertical";
    className?: string;
    style?: CSSProperties;
    children?: React.ReactNode;
    onSelect?: onSelect;
    defaultOpen?: Array<string>;
}
interface contextProps {
    index: string;
    onSelect?: onSelect;
    mode?: "horizontal" | "vertical";
    defaultOpen?: Array<string>;
}
export declare const MenuContext: React.Context<contextProps>;
export declare const Menu: FC<MenuProps>;
export default Menu;
