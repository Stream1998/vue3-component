import { withInstall } from '@lxd/utils/withInstall';

import _Upload from './src/upload.vue';

const Upload = withInstall(_Upload);

export default Upload;

export * from './src/upload';

declare module 'vue' {
  export interface GlobalComponents {
    XdUpload: typeof Upload;
  }
}
