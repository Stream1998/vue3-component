import { ExtractPropTypes, PropType } from 'vue';

export type BaseType = string | number;

export interface TreeOptions {
  label?: BaseType;
  key?: BaseType;
  children?: TreeOptions[];
  isLeaf?: boolean;
  disabled?: boolean;
  [key: string]: unknown;
}

export interface TreeNode extends Required<TreeOptions> {
  level: number;
  raw: TreeOptions;
  children: TreeNode[];
  parentKey: BaseType | undefined;
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
  showCheckbox: Boolean,
  selectable: Boolean,
  multiple: Boolean,
  onLoad: Function as PropType<(node: TreeNode) => Promise<TreeOptions[]>>,
} as const;

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true,
  },
  showCheckbox: Boolean,
  isExpand: Boolean,
  isLoading: Boolean,
  isSelected: Boolean,
  isChecked: Boolean,
  isIndeterminate: Boolean,
} as const;

export const treeNodeEmits = {
  toggle: (node: TreeNode) => node,
  select: (node: TreeNode) => node,
  check: (node: TreeNode, state: boolean) => typeof state === 'boolean',
};
export type TreeProps = Partial<ExtractPropTypes<typeof treeProps>>;
export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;
