<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { TreeNode, TreeOptions, treeProps, BaseType } from './tree';
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
function createTree(data: TreeOptions[]): TreeNode[] {
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
  return traverse(data);
}

watch(
  () => props.data,
  (data: TreeOptions[]) => {
    tree.value = createTree(data);
  },
  {
    immediate: true,
  }
);

// 根据指定的默认展开key数组，扁平化树
const expandedKeysRef = ref<Set<BaseType>>(new Set(props.defaultExpandedKeys));

const reverse = (array, cb) => {
  for (let i = array.length - 1; i >= 0; --i) {
    cb(array[i]);
  }
};

const flattenTree = computed(() => {
  const expandedKeys = expandedKeysRef.value;
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
  console.log(result);
  return result;
});

// 是否展开
function isExpand(node: TreeNode): boolean {
  return expandedKeysRef.value.has(node.key);
}

// 收起
function collapse(node: TreeNode) {
  expandedKeysRef.value.delete(node.key);
}

// 展开
function expand(node: TreeNode) {
  expandedKeysRef.value.add(node.key);
}

// 切换[收起/展开]状态
function toggle(node: TreeNode) {
  if (isExpand(node)) {
    console.log('收起');
    collapse(node);
  } else {
    console.log('展开');
    expand(node);
  }
  console.log(expandedKeysRef.value);
  console.log(flattenTree.value);
}
</script>

<template>
  <div :class="bem.b()">
    <xd-tree-node
      v-for="node in flattenTree"
      :key="node.key"
      :node="node"
      :is-expand="isExpand(node)"
      @toggle="toggle"
    ></xd-tree-node>
  </div>
</template>

<style></style>
