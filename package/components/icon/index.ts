// 组件入口文件
import _Icon from './src/icon.vue';
import { withInstall } from '@lxd/utils/withInstall';

const Icon = withInstall(_Icon);

export default Icon;

export * from './src/icon';

declare module 'vue' {
  export interface GlobalComponents {
    XdIcon: typeof Icon;
  }
}
