import { UploadRawFile } from './upload';

type UploadProgressEvent = ProgressEvent & { percentage: number };

export interface UploadOptions {
  url: string;
  method: string;
  headers?: Record<string, any>;
  data?: Record<string, any>;
  file: UploadRawFile;
  filename: string;
  onProgress: (e: UploadProgressEvent) => void;
  onSuccess: (response: any) => void;
  onError: (e: any) => void;
}

function setRecord(obj, fn) {
  if (obj) {
    for (const [key, value] of Object.entries(obj)) {
      fn(key, value);
    }
  }
}

export default function httpRequest(options: UploadOptions) {
  const xhr = new XMLHttpRequest();
  const {
    url,
    method,
    headers,
    data,
    file,
    filename,
    onProgress,
    onSuccess,
    onError,
  } = options;
  xhr.open(method, url);

  // header
  setRecord(headers, xhr.setRequestHeader);

  // data
  const formData = new FormData();
  formData.append(filename, file);
  setRecord(data, formData.append);

  xhr.upload.addEventListener('progress', (e: ProgressEvent) => {
    const event = e as UploadProgressEvent;
    event.percentage = (e.loaded / e.total) * 100;
    onProgress && onProgress(event);
  });

  xhr.onload = function () {
    if (xhr.status < 300 && xhr.status >= 200) {
      onSuccess && onSuccess(xhr.response);
    } else {
      onError && onError(xhr.response);
    }
  };

  xhr.addEventListener('error', (err: Event) => {
    onError && onError(err);
  });

  xhr.send(formData);
}
