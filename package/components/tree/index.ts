import _Tree from './src/tree.vue';
import { withInstall } from '@lxd/utils/withInstall';

const Tree = withInstall(_Tree);

export default Tree;

export * from './src/tree';

declare module 'vue' {
  export interface GlobalComponents {
    XdTree: typeof Tree;
  }
}
