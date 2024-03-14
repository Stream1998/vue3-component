<script setup lang="ts">
import createNamespace from '@lxd/utils/createBEM';
import { buttonEmits, buttonProps } from './button';
import Loading from '@lxd/icons/src/Loading';
import { useSlots } from 'vue';

defineOptions({
  name: 'xd-button',
  inheritAttrs: false, // 不继承属性
});
defineProps(buttonProps);
const emit = defineEmits(buttonEmits);
const bem = createNamespace('button');
const slots = useSlots();
</script>
<template>
  <button
    :class="[
      bem.b(),
      bem.e(size),
      bem.e(type),
      bem.is('loading', loading),
      bem.is('disabled', disabled || loading),
    ]"
    :type="nativeType"
    :disabled="disabled"
    @click="e => emit('click', e)"
    @mousedown="e => emit('mousedown', e)"
  >
    <template v-if="placement === 'left'">
      <Loading v-if="loading" :state="true"></Loading>
      <template v-else-if="slots.icon">
        <component :is="slots.icon"></component>
      </template>
    </template>
    <slot></slot>
    <template v-if="placement === 'right'">
      <Loading v-if="loading" :state="true"></Loading>
      <template v-else-if="slots.icon">
        <component :is="slots.icon"></component>
      </template>
    </template>
  </button>
</template>
<style scoped></style>
