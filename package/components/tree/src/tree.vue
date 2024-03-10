<script setup lang="ts">
import { ref, watch } from 'vue';
import { TreeNode, TreeOptions, treeProps } from './tree';

defineOptions({
  name: 'xd-tree',
});

const props = defineProps(treeProps);
const tree = ref<TreeNode[]>([]);
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
    console.log(tree.value);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div>tree</div>
</template>

<style></style>
