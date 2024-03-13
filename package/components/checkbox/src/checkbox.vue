<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { checkboxEmits, checkboxProps } from './checkbox';
defineOptions({
  name: 'xd-checkbox',
});
const props = defineProps(checkboxProps);
const emit = defineEmits(checkboxEmits);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(val: boolean) {
    emit('update:modelValue', val);
  },
});

const inputRef = ref<HTMLInputElement>();

function updateIndeterminate(state: boolean) {
  inputRef.value!.indeterminate = state;
}

watch(
  () => props.indeterminate,
  state => {
    updateIndeterminate(state);
  }
);
</script>
<template>
  <label>
    <input
      ref="inputRef"
      v-model="value"
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
