<script setup lang="ts">
import { ref, watch } from 'vue';
import { checkboxProps } from './checkbox';
import createNamespace from '@lxd/utils/createBEM';
defineOptions({
  name: 'xd-checkbox',
});
const props = defineProps(checkboxProps);
const bem = createNamespace('checkbox');
const model = defineModel<boolean>({ default: true });

const inputRef = ref<HTMLInputElement>();

function updateIndeterminate(state: boolean) {
  inputRef.value!.indeterminate = state;
}

watch(
  () => props.indeterminate,
  state => {
    updateIndeterminate(state);
  },
);
</script>
<template>
  <label :class="[bem.b(), bem.is('disabled', disabled)]">
    <input
      ref="inputRef"
      v-model="model"
      type="checkbox"
      :disabled="disabled"
    />
    <span>
      <template v-if="label">{{ label }}</template>
      <slot v-else></slot>
    </span>
  </label>
</template>
<style scoped></style>
