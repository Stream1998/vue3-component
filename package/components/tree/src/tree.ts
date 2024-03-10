import { ExtractPropTypes, PropType } from 'vue';

type BaseType = string | number;

export interface TreeOptions {
  label?: BaseType;
  key?: BaseType;
  children?: TreeOptions[];
  isLeaf?: boolean;
  [key: string]: unknown;
}

export interface TreeNode extends Required<TreeOptions> {
  level: number;
  raw: TreeOptions;
  children: TreeNode[];
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeOptions[]>,
    default: () => [],
  },
  labelField: {
    type: String,
    default: 'label',
  },
  keyField: {
    type: String,
    default: 'key',
  },
  childrenField: {
    type: String,
    default: 'children',
  },
} as const;

export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;