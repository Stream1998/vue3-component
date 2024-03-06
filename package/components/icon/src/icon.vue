<script setup lang="ts">
import createNamespace from '@lxd/utils/createBEM';
import { iconProps } from './icon';
import { computed } from 'vue';
const props = defineProps(iconProps);

defineOptions({
  name: 'xd-icon',
});

const bem = createNamespace('icon');

const style = computed(() => {
  if (!props.color && !props.size) return {};
  return {
    ...(props.color ? { color: props.color } : {}),
    ...(props.size ? { 'font-size': props.size + 'px' } : {}),
  };
});
</script>

<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<style scoped></style>
