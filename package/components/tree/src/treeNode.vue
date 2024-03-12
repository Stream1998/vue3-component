<script setup lang="ts">
import createNamespace from '@lxd/utils/createBEM';
import { treeNodeProps, treeNodeEmits, TreeNode } from './tree';
import CaretRight from '@lxd/icons/src/CaretRight';
import Refresh from '@lxd/icons/src/Refresh';

const bem = createNamespace('tree-node');
defineProps(treeNodeProps);
const emit = defineEmits(treeNodeEmits);

function handleExpand(node: TreeNode) {
  if (node.disabled) return;
  emit('toggle', node);
}

function handleSelect(node: TreeNode) {
  if (node.disabled) return;
  emit('select', node);
}
</script>

<template>
  <div
    :class="[
      bem.b(),
      bem.is('selected', isSelected),
      bem.is('disabled', node.disabled),
    ]"
    :style="{ 'padding-left': node.level * 16 + 'px' }"
    @click="handleSelect(node)"
  >
    <xd-icon
      :class="[
        bem.e('expand-icon'),
        bem.is('expand', isExpand),
        bem.is('leaf', node.isLeaf),
        bem.is('loading', isLoading),
      ]"
      :size="16"
      @click.stop="handleExpand(node)"
    >
      <CaretRight v-if="!isLoading"></CaretRight>
      <Refresh v-else></Refresh>
    </xd-icon>
    <span>
      <slot name="label" :node="node">{{ node.label }}</slot>
    </span>
  </div>
</template>
<style scoped></style>
