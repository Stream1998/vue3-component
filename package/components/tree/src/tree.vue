<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { TreeNode, TreeOptions, treeProps, BaseType, treeEmits } from './tree';
import createNamespace from '@lxd/utils/createBEM';
import XdTreeNode from './treeNode.vue';

defineOptions({
  name: 'xd-tree',
});

const bem = createNamespace('tree');
const props = defineProps(treeProps);
const tree = ref<TreeNode[]>();

// 建立字段映射
function createTreeOptions(
  labelField: string,
  keyFeild: string,
  childrenField: string
) {
  return {
    getLabel(node: TreeOptions) {
      return node[labelField] as string;
    },
    getKey(node: TreeOptions) {
      return node[keyFeild] as string;
    },
    getChildren(node: TreeOptions) {
      return node[childrenField] as TreeNode[];
    },
  };
}

const treeOptions = createTreeOptions(
  props.labelField,
  props.keyField,
  props.childrenField
);

// 格式化数据，构建树
function createTree(
  data: TreeOptions[],
  parent: TreeNode | null = null
): TreeNode[] {
  function traverse(
    data: TreeOptions[],
    parent: TreeNode | null = null
  ): TreeNode[] {
    return data.map((node: TreeOptions) => {
      const children = treeOptions.getChildren(node) || [];
      const treeNode: TreeNode = {
        key: treeOptions.getKey(node),
        label: treeOptions.getLabel(node),
        children: [],
        raw: node,
        level: parent ? parent.level + 1 : 0,
        isLeaf: node.isLeaf ?? children?.length == 0,
      };
      if (children.length) {
        treeNode.children = traverse(children, treeNode);
      }
      return treeNode;
    });
  }
  return traverse(data, parent);
}

watch(
  () => props.data,
  (data: TreeOptions[]) => {
    tree.value = createTree(data);
    console.log(tree.value);
  },
  {
    immediate: true,
  }
);

// 逆序遍历
const reverse = (array, cb) => {
  for (let i = array.length - 1; i >= 0; --i) {
    cb(array[i]);
  }
};

// 根据指定的默认展开key数组，扁平化树
const expandedKeysSet = ref<Set<BaseType>>(new Set(props.defaultExpandedKeys));

const flattenTree = computed(() => {
  const expandedKeys = expandedKeysSet.value;
  const nodes: TreeNode[] = tree.value || [];
  const stack: TreeNode[] = [];
  reverse(nodes, node => stack.push(node));
  const result: TreeNode[] = [];
  while (stack.length) {
    const node: TreeNode = stack.pop()!;
    if (!node) continue;
    result.push(node);
    if (expandedKeys.has(node.key)) {
      const children: TreeNode[] = node.children;
      if (children) {
        reverse(children, node => stack.push(node));
        // 为什么使用 reverse 就会丢失响应式呢？
        // children.reverse().forEach((node: TreeNode) => {
        //   stack.push(node);
        // });
      }
    }
  }
  return result;
});

// 是否展开
function isExpand(node: TreeNode): boolean {
  return expandedKeysSet.value.has(node.key);
}

// 收起
function collapse(node: TreeNode) {
  expandedKeysSet.value.delete(node.key);
}

const loadingKeysSet = ref<Set<BaseType>>(new Set());

// 展开
function expand(node: TreeNode) {
  expandedKeysSet.value.add(node.key);

  if (node.children.length && !node.isLeaf) return;

  if (!isLoading(node)) {
    loadingKeysSet.value.add(node.key);
    props.onLoad &&
      props.onLoad(node).then((children: TreeOptions[]) => {
        node.raw.children = children;
        node.children = createTree(children, node);
        loadingKeysSet.value.delete(node.key);
      });
  }
}

// 切换[收起/展开]状态
function toggle(node: TreeNode) {
  isExpand(node) && !isLoading(node) ? collapse(node) : expand(node);
}

// 是否加载
function isLoading(node: TreeNode) {
  return loadingKeysSet.value.has(node.key);
}

const emits = defineEmits(treeEmits);

const selectedKeys = ref<BaseType[]>([]);

watch(
  () => props.defaultSelectedKeys,
  (data: BaseType[]) => {
    selectedKeys.value = data;
  },
  {
    immediate: true,
  }
);

function handleSelect(node: TreeNode) {
  if (!props.selectable) return;
  let _selectedKeys = Array.from(selectedKeys.value);
  if (props.multiple) {
    const index = _selectedKeys.findIndex(key => node.key === key);
    if (index > -1) {
      _selectedKeys.splice(index, 1);
    } else {
      _selectedKeys.push(node.key);
    }
  } else {
    _selectedKeys = [node.key];
  }
  emits('update:defaultSelectedKeys', _selectedKeys);
}

function isSelected(node: TreeNode): boolean {
  return selectedKeys.value.includes(node.key);
}
</script>

<template>
  <div :class="bem.b()">
    <xd-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :is-expand="isExpand(node)"
      :is-loading="isLoading(node)"
      :is-selected="isSelected(node)"
      @toggle="toggle"
      @select="handleSelect"
    ></xd-tree-node>
  </div>
</template>

<style></style>
