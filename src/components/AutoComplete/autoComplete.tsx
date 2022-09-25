import React, {
  ChangeEvent,
  FC,
  useState,
  ReactElement,
  useEffect,
} from "react";
import Input, { InputProps } from "../Input/input";
import useDebounce from "../../hooks/useDebounce";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  // Promise的泛型T代表promise变成成功态之后resolve的值，resolve(value)
  getAutoCompeleteChoiese: (
    keyword: string
  ) => Array<DataSourceType> | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType<any>) => void;
  customRender?: (item: DataSourceType<any>) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    getAutoCompeleteChoiese,
    onSelect,
    customRender,
    value,
    ...resProps
  } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [results, setResults] = useState<DataSourceType[]>([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debouncedValue = useDebounce(inputValue, 300);
  useEffect(() => {
    if (inputValue) {
      const choices = getAutoCompeleteChoiese(debouncedValue);
      if (choices instanceof Promise) {
        setShowLoading(true);
        choices.then((res) => {
          res ? setResults(res) : setResults([]);
          setShowLoading(false);
        });
      } else {
        setResults(choices);
      }
    } else {
      setResults([]);
    }
  }, [debouncedValue, getAutoCompeleteChoiese]);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 踩坑： if和setResults中不能使用inputValue，因为setInputValue为异步更新
    const value = e.target.value.trim();
    setInputValue(value);
    setHighlightIndex(-1);
  };
  const handleClickResult = (item: DataSourceType) => {
    setInputValue(item.value?.trim());
    setResults([]);
    onSelect && onSelect(item);
  };
  const highlight = (index: number) => {
    console.log(index);
    if (index < 0) {
      index = 0;
    }
    if (index >= results.length) {
      index = results.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    console.log(e.key);
    switch (e.key) {
      case "ArrowDown":
        highlight(highlightIndex + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        highlight(highlightIndex - 1);
        break;
      case "Escape":
        setResults([]);
        break;
      case "Enter":
        if (results[highlightIndex]) {
          handleClickResult(results[highlightIndex]);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        {...resProps}
      ></Input>
      {showLoading && <h1>loading...</h1>}
      <ul>
        {results.length > 0 &&
          results.map((res, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  handleClickResult(res);
                }}
              >
                {customRender ? customRender(res) : res.value}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default AutoComplete;
