import react, { FC } from "react";
declare type UploadFileStatus = "ready" | "uploading" | "success" | "error";
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
    headers?: {
        [key: string]: any;
    };
    name?: string;
    customFormData?: {
        [key: string]: any;
    };
    withCredentials?: boolean;
    multiple?: boolean;
    accept?: string;
    children?: react.ReactNode;
    drag?: boolean;
}
declare const Upload: FC<UploadProps>;
export default Upload;
