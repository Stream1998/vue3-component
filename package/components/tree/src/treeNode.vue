<script setup lang="ts">
import createNamespace from '@lxd/utils/createBEM';
import { treeNodeProps, treeNodeEmits } from './tree';
import CaretRight from '@lxd/icons/src/CaretRight';

const bem = createNamespace('tree-node');
const props = defineProps(treeNodeProps);
const emits = defineEmits(treeNodeEmits);

function handleExpand() {
  emits('toggle', props.node);
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
      @click="handleExpand"
    >
      <CaretRight></CaretRight>
    </xd-icon>
    <span> {{ node.label }}</span>
  </div>
</template>
<style scoped></style>
