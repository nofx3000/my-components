import { FC, ReactElement } from "react";
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    getAutoCompeleteChoiese: (keyword: string) => Array<DataSourceType> | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType<any>) => void;
    customRender?: (item: DataSourceType<any>) => ReactElement;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
