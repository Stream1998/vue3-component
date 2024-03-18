import { ExtractPropTypes, PropType } from 'vue';

export type UploadRawFile = File & { uid: string };

export interface UploadFile {
  uid: string;
  name: string;
  percentage: number;
  size: number;
}

const NOOP = () => {};

export const uploadProps = {
  action: {
    type: String,
    required: true,
  },
  headers: Object,
  method: {
    type: String,
    default: 'post',
  },
  // 上传附带参数
  data: {
    type: Object,
    default: () => {},
  },
  accept: String,
  multiple: {
    type: Boolean,
    default: false,
  },
  limit: {
    type: Number,
    default: 10,
  },
  // 上传文件字段名
  name: {
    type: String,
    default: 'file',
  },
  showFileList: {
    type: Boolean,
    default: true,
  },
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: () => [],
  },
  drag: {
    type: Boolean,
    default: false,
  },
  beforeUpload: {
    type: Function as PropType<
      (rawFile: UploadRawFile) => Promise<boolean> | boolean
    >,
    default: () => true,
  },
  onProgress: {
    type: Function as PropType<
      (event: ProgressEvent, uploadFile: UploadFile) => void
    >,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<
      (response: any, uploadFile: UploadFile, fileList: UploadFile[]) => void
    >,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<
      (error: Error, uploadFile: UploadFile, fileList: UploadFile[]) => void
    >,
    default: NOOP,
  },
  onChange: {
    type: Function as PropType<
      (uploadFile: UploadFile, fileList: UploadFile[]) => void
    >,
    default: NOOP,
  },
  onRemove: {
    type: Function as PropType<
      (uploadFile: UploadFile, fileList: UploadFile[]) => void
    >,
    default: NOOP,
  },
  beforeRemove: {
    type: Function as PropType<
      (
        uploadFile: UploadFile,
        fileList: UploadFile[],
      ) => Promise<boolean> | boolean
    >,
    default: () => true,
  },
  onPreview: {
    type: Function as PropType<(uploadFile: UploadFile) => void>,
    default: NOOP,
  },
  onExceed: {
    type: Function as PropType<
      (files: FileList, fileList: UploadFile[]) => void
    >,
    default: NOOP,
  },
} as const;

export type UploadProps = ExtractPropTypes<typeof uploadProps>;

export const uploadEmits = {
  'update:file-list': (fileList: UploadFile[]) => fileList,
};

export type UploadEmits = typeof uploadEmits;
