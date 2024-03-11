<script setup lang="ts">
import createNamespace from '@lxd/utils/createBEM';
import { treeNodeProps } from './tree';
import CaretRight from '@lxd/icons/src/CaretRight';

const bem = createNamespace('tree');
const props = defineProps(treeNodeProps);
</script>

<template>
  <div
    :class="bem.e('node')"
    :style="{ 'padding-left': node.level * 16 + 'px' }"
  >
    <xd-icon :size="16">
      <CaretRight></CaretRight>
    </xd-icon>
    <span> {{ props.node.label }}</span>
  </div>
</template>
<style scoped></style>
