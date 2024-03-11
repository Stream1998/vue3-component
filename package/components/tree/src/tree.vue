<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { TreeNode, TreeOptions, treeProps, BaseType } from './tree';

defineOptions({
  name: 'xd-tree',
});

const props = defineProps(treeProps);
const tree = ref<TreeNode[]>([]);

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

const flattenTree = computed(() => {
  const expandedKeys = expandedKeysRef.value;
  const nodes: TreeNode[] = tree.value || [];
  const stack: TreeNode[] = nodes.reverse();
  const result: TreeNode[] = [];
  while (stack.length) {
    const node: TreeNode = stack.pop()!;
    if (!node) continue;
    result.push(node);
    if (expandedKeys.has(node.key)) {
      const children: TreeNode[] = node.children;
      if (children.length) {
        children.reverse().forEach((node: TreeNode) => {
          stack.push(node);
        });
      }
    }
  }
  return result;
});
console.log(flattenTree.value);
</script>

<template>
  <div>tree</div>
</template>

<style></style>
