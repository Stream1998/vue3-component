<script setup lang="ts">
import createNamespace from '@lxd/utils/createBEM';
import { treeNodeProps, treeNodeEmits, TreeNode } from './tree';
import CaretRight from '@lxd/icons/src/CaretRight';

const bem = createNamespace('tree-node');
defineProps(treeNodeProps);
const emits = defineEmits(treeNodeEmits);

function handleExpand(node: TreeNode) {
  emits('toggle', node);
}
</script>

<template>
  <div :class="bem.b()" :style="{ 'padding-left': node.level * 16 + 'px' }">
    <xd-icon
      :class="[
        bem.e('expand-icon'),
        bem.is('expand', isExpand),
        bem.is('leaf', node.isLeaf),
      ]"
      :size="16"
      @click="handleExpand(node)"
    >
      <CaretRight></CaretRight>
    </xd-icon>
    <span> {{ node.label }}</span>
  </div>
</template>
<style scoped></style>
