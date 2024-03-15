<script setup lang="ts">
import createNamespace from '@lxd/utils/createBEM';
import {
  Arrayable,
  FormItemInjectKey,
  FormItemRule,
  Trigger,
  ValidateState,
  formItemProps,
} from './formItem';
import { computed, inject, provide, ref } from 'vue';
import { FormContext, FormInjectKey } from './form';
import AsyncValidator, { Values } from 'async-validator';

defineOptions({
  name: 'xd-form-item',
});
const props = defineProps(formItemProps);

const formContext: FormContext = inject(FormInjectKey)!;

const errorMessage = ref('');

function toArray<T>(obj?: Arrayable<T>) {
  return obj ? (Array.isArray(obj) ? obj : [obj]) : [];
}

function mergeRules() {
  if (formContext.rules && props.prop) {
    const formRules = toArray<FormItemRule>(formContext.rules[props.prop]);
    const itemRules = toArray<FormItemRule>(props.rules);
    return formRules.concat(itemRules);
  } else {
    return toArray<FormItemRule>(props.rules);
  }
}

const rules = computed(() => mergeRules());

function getFilteredRules(trigger?: Trigger) {
  return rules.value.filter(rule => {
    if (!rule.trigger || !trigger) return true;
    if (Array.isArray(rule.trigger)) return rule.trigger.includes(trigger);
    return rule.trigger === trigger;
  });
}

function validate(
  trigger?: Trigger,
  callback?: (state: ValidateState, error?: Values) => void
) {
  const modelName = props.prop!;
  const rules = getFilteredRules(trigger);
  const validator = new AsyncValidator({
    [modelName]: rules,
  });
  const model = formContext.model;
  return validator
    .validate({
      [modelName]: model[modelName],
    })
    .then(() => {
      errorMessage.value = '';
      callback && callback('success');
    })
    .catch((error: Values) => {
      errorMessage.value = error.errors[0] ? error.errors[0].message : '';
      callback && callback('error', error);
      return Promise.reject(error);
    });
}

const bem = createNamespace('form-item');

const context = {
  validate,
};

formContext.addItemContext(context);

provide(FormItemInjectKey, context);
</script>
<template>
  <div :class="bem.b()">
    <label>
      <slot name="label">{{ label }} </slot>
    </label>
    <div :class="bem.e('content')">
      <slot></slot>
      <slot name="error">
        <span :class="bem.e('error')">{{ errorMessage }}</span>
      </slot>
    </div>
  </div>
</template>
<style scoped></style>
