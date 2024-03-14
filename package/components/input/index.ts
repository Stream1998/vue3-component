import { withInstall } from '@lxd/utils/withInstall';
import _Input from './src/input.vue';

const Input = withInstall(_Input);

export default Input;

export * from './src/input';

declare module 'vue' {
  export interface GlobalComponents {
    XdInput: typeof Input;
  }
}
