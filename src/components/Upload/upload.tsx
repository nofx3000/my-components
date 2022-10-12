import react, { ChangeEvent, FC, useRef, useState } from "react";
import axios, { AxiosProgressEvent } from "axios";
import Button from "../Button/button";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";
import Dragger from "../Upload/dragger";

type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  percentage?: number;
  raw?: File;
  status?: UploadFileStatus;
  error?: any;
  response?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean;
  onProgress?: (percentage: number, file: UploadFile) => void;
  onSuccess?: (data: any, file: UploadFile) => void;
  onError?: (err: any, file: UploadFile) => void;
  onChange?: (file: UploadFile) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: any };
  name?: string;
  customFormData?: { [key: string]: any };
  withCredentials?: boolean;
  multiple?: boolean;
  accept?: string;
  children?: react.ReactNode;
  drag?: boolean;
}
const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    onError,
    onProgress,
    onSuccess,
    beforeUpload,
    onChange,
    onRemove,
    headers,
    name,
    customFormData,
    withCredentials,
    multiple,
    accept,
    children,
    drag,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(
    defaultFileList ? defaultFileList : []
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // 不能直接将转换数组赋值给files  ❌files = Array.from(files)
      // 在转换中可能会丢失一些属性导致类型报错
      const postFiles = Array.from(files);
      postFiles.forEach((file) => {
        handlePost(file);
      });
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const updateFile = (
    fileWantToUpdate: UploadFile,
    updateContent: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      console.log(prevList);
      return prevList.map((file) => {
        if (file.uid === fileWantToUpdate.uid) {
          return { ...file, ...updateContent };
        } else {
          return file;
        }
      });
    });
  };

  const handlePost = (file: File) => {
    if (beforeUpload && !beforeUpload(file)) {
      return;
    }
    const _file: UploadFile = {
      uid: `${Date()}${file.name}`,
      name: file.name,
      size: file.size,
      raw: file,
      percentage: 0,
      status: "ready",
    };
    // setFileList([_file, ...fileList]);
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const data = new FormData();
    data.append(name || "file", file);
    if (customFormData) {
      for (let key in customFormData) {
        data.append(key, customFormData[key]);
      }
    }
    axios
      .post(action, data, {
        headers: { ...headers, "Content-Type": "multipart/form-data" },
        withCredentials,
        onUploadProgress: (e: AxiosProgressEvent) => {
          let percentage = e.total
            ? Math.round((e.loaded * 100) / e.total) || 0
            : 100;
          if (percentage < 100) {
            updateFile(_file, { percentage, status: "uploading" });
            onProgress && onProgress(percentage, _file);
          }
        },
      })
      .then((res) => {
        console.log(res);
      })
      .then((res) => {
        console.log("upload success");
        updateFile(_file, { status: "success", response: res });
        if (onSuccess) {
          onSuccess(res, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      })
      .catch((err) => {
        console.log("upload error");
        updateFile(_file, { status: "error", error: err });
        if (onError) {
          onError(err, _file);
        }
        if (onChange) {
          onChange(_file);
        }
      });
  };
  return (
    <div className="viking-upload-component">
      <div
        className="viking-upload-input"
        style={{ display: "inline-block" }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              const postFiles = Array.from(files);
              postFiles.forEach((file) => {
                handlePost(file);
              });
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          type="file"
          style={{ display: "none" }}
          ref={inputRef}
          onChange={handleFileChange}
          multiple={multiple}
          accept={accept}
        ></input>
      </div>
      <ul className="viking-upload-list">
        {fileList.map((file) => {
          return (
            <li className="viking-upload-list-item" key={file.uid}>
              <span className={`file-name file-name-${file.status}`}>
                {file.name}
              </span>
              <span className="file-status">
                {(file.status === "uploading" || file.status === "ready") && (
                  <Icon icon="spinner" spin theme="primary" />
                )}
                {file.status === "success" && (
                  <Icon icon="check-circle" theme="success" />
                )}
                {file.status === "error" && (
                  <Icon icon="times-circle" theme="danger" />
                )}
              </span>

              <span className="file-actions">
                <Icon
                  icon="times"
                  onClick={() => {
                    onRemove && onRemove(file);
                    setFileList((prevList) => {
                      return prevList.filter((item) => item.uid !== file.uid);
                    });
                  }}
                ></Icon>
              </span>
              {file.status === "uploading" && (
                <Progress
                  percentage={file.percentage || 0}
                  theme="primary"
                  showText={true}
                ></Progress>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Upload;
