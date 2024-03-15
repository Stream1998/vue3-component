<script setup lang="ts">
import { provide, ref } from 'vue';
import { FormInjectKey, formProps, FormExpose } from './form';
import { FormItemContext, ValidateState } from './formItem';
import { Values } from 'async-validator';

defineOptions({
  name: 'xd-form',
});
const props = defineProps(formProps);
const contextList = ref<FormItemContext[]>([]);

function addItemContext(context: FormItemContext) {
  contextList.value.push(context);
}

async function validate(
  callback?: (state: ValidateState, error?: Values) => void
) {
  let errors: Values[] = [];
  for (let i = 0; i < contextList.value.length; i++) {
    try {
      await contextList.value[i].validate();
    } catch (error) {
      errors = [...errors, ...(error as Values).errors];
    }
  }
  if (errors.length === 0) {
    callback && callback('success');
    return;
  }
  callback && callback('error', errors);
}

defineExpose<FormExpose>({ validate });

provide(FormInjectKey, {
  model: props.model,
  rules: props.rules,
  addItemContext,
});
</script>
<template>
  <form>
    <slot></slot>
  </form>
</template>
<style scoped></style>
