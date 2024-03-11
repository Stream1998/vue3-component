import { ExtractPropTypes, PropType } from 'vue';

export type BaseType = string | number;

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
  defaultExpandedKeys: {
    type: Array as PropType<BaseType[]>,
    default: () => [],
  },
  defaultSelectedKeys: {
    type: Array as PropType<BaseType[]>,
    default: () => [],
  },
  selectable: Boolean,
  multiple: Boolean,
  onLoad: Function as PropType<(node: TreeNode) => Promise<TreeOptions[]>>,
} as const;

export const treeEmits = {
  'update:defaultSelectedKeys': (keys: BaseType[]) => keys,
};

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  isExpand: Boolean,
  isLoading: Boolean,
  isSelected: Boolean,
} as const;

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
};
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;
export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;
