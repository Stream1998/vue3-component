import { withInstall } from '@lxd/utils/withInstall';
import _Checkbox from './src/checkbox.vue';

const Checkbox = withInstall(_Checkbox);

export default Checkbox;

export * from './src/checkbox';

declare module 'vue' {
  export interface GlobalComponents {
    XdCheckbox: typeof Checkbox;
  }
}
