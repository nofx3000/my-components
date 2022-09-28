import React, {
  ChangeEvent,
  FC,
  useState,
  ReactElement,
  useEffect,
  useRef,
  RefObject,
} from "react";
import Input, { InputProps } from "../Input/input";
import Transition from "../Transition/transition";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";

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
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debouncedValue = useDebounce(inputValue, 300);
  const searchTrigger = useRef(false);
  const divRef = useRef<HTMLDivElement>();
  useClickOutside(divRef as RefObject<HTMLElement>, () => {
    setResults([]);
  });

  // get autocomplete choices
  useEffect(() => {
    if (debouncedValue && searchTrigger.current) {
      // 先清空结果数组
      // 踩坑： 如果setResults([])放在if判断外
      // 会导致任何输入都会执行setResults([])
      // 清空input框时列表会先缩到最小然后执行动画
      // 使动画看不出效果
      setResults([]);
      const choices = getAutoCompeleteChoiese(debouncedValue);
      if (choices instanceof Promise) {
        setShowLoading(true);
        choices.then((res) => {
          setShowLoading(false);
          setResults(res);
          if (res.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setResults(choices);
        if (choices.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }
  }, [debouncedValue, getAutoCompeleteChoiese]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("showLoading:", showLoading);
    // 踩坑： if和setResults中不能使用inputValue，因为setInputValue为异步更新
    const value = e.target.value.trim();
    setInputValue(value);
    searchTrigger.current = true;
    setHighlightIndex(-1);
  };

  const handleClickResult = (item: DataSourceType) => {
    searchTrigger.current = false;
    setInputValue(item.value?.trim());
    setShowDropdown(false);
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
    switch (e.key) {
      case "ArrowDown":
        highlight(highlightIndex + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        highlight(highlightIndex - 1);
        break;
      case "Escape":
        setShowDropdown(false);
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

  const renderList = () => {
    return (
      <Transition
        in={showDropdown || showLoading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          console.log("out!!!");
          setResults([]);
        }}
      >
        <ul className="viking-suggestion-list">
          {showLoading && (
            <div className="suggstions-loading-icon">loading...</div>
          )}
          {results.map((res, index) => {
            const classes = classNames("suggestion-item ", {
              "is-active": highlightIndex === index,
            });
            return (
              <li
                key={index}
                className={classes}
                onClick={() => {
                  handleClickResult(res);
                }}
              >
                {customRender ? customRender(res) : res.value}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };

  return (
    <div
      className="viking-auto-complete"
      ref={divRef as RefObject<HTMLDivElement>}
    >
      <Input
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        {...resProps}
      ></Input>
      {renderList()}
    </div>
  );
};

export default AutoComplete;
