import react, { DragEvent, FC, useState } from "react";
import classnames from "classnames";

interface DraggerProps {
  onFile: (files: FileList) => void;
  children: react.ReactNode;
}

const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  const [isDragOver, setIsDragOver] = useState(false);
  const classes = classnames("viking-uploader-dragger", {
    "is-dragover": isDragOver,
  });
  const handleDrag = (e: DragEvent<HTMLElement>, isDragOver: boolean) => {
    e.preventDefault();
    setIsDragOver(isDragOver);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    onFile(e.dataTransfer.files);
  };
  return (
    <div
      className={classes}
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={(e) => {
        handleDrop(e);
      }}
    >
      {children}
    </div>
  );
};

export default Dragger;
