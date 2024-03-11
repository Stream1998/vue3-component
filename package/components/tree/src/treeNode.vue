<script setup lang="ts">
import createNamespace from '@lxd/utils/createBEM';
import { treeNodeProps, treeNodeEmits, TreeNode } from './tree';
import CaretRight from '@lxd/icons/src/CaretRight';
import Refresh from '@lxd/icons/src/Refresh';

const bem = createNamespace('tree-node');
defineProps(treeNodeProps);
const emits = defineEmits(treeNodeEmits);

function handleExpand(node: TreeNode) {
  emits('toggle', node);
}
</script>

<template>
  <div :class="bem.b()" :style="{ 'padding-left': node.level * 16 + 'px' }">
    <xd-icon :class="[
    bem.e('expand-icon'),
    bem.is('expand', isExpand),
    bem.is('leaf', node.isLeaf),
    bem.is('loading', isLoading)]" :size="16" @click="handleExpand(node)">
      <CaretRight v-show="!isLoading"></CaretRight>
      <Refresh v-show="isLoading"></Refresh>
    </xd-icon>
    <span> {{ node.label }}</span>
  </div>
</template>
<style scoped></style>
