import react, { CSSProperties, FC } from "react";
import { ThemeProps } from "../Icon/icon";

interface progressProps {
  percentage: number;
  theme?: ThemeProps;
  showText?: boolean;
  barHeight?: number;
  styles?: CSSProperties;
}

export const Progress: FC<progressProps> = (props) => {
  const { percentage, theme, showText, barHeight, styles } = props;
  return (
    <div className="viking-progress-bar" style={styles}>
      <div
        className="viking-progress-bar-outer"
        style={{ height: `${barHeight}px` }}
      >
        <div
          className={`viking-progress-bar-inner color-${theme}`}
          style={{
            width: `${percentage}%`,
          }}
        >
          {showText && <span className="inner-text">{percentage}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  theme: "primary",
  showText: true,
  barHeight: 15,
};

export default Progress;
