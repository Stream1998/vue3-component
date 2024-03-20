<script setup lang="ts">
import {
  ref,
  onMounted,
  watch,
  useSlots,
  computed,
  nextTick,
  inject,
} from 'vue';
import { inputEmits, inputProps } from './input';
import createNamespace from '@lxd/utils/createBEM';
import Eye from '@lxd/icons/src/Eye';
import EyeClosed from '@lxd/icons/src/EyeClosed';
import Clear from '@lxd/icons/src/Clear';
import { FormItemInjectKey } from '../../form';

defineOptions({
  name: 'xd-input',
  inheritAttrs: false,
});
const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);
const model = defineModel<string>({ default: '' });
const slots = useSlots();
const bem = createNamespace('input');
const formItemContext = inject(FormItemInjectKey);

const input = ref<HTMLInputElement>();

watch(
  () => props.modelValue,
  value => {
    if (!value) {
      // reset password icon
      passwordVisiable.value = false;
    }
    updateModelValue(value);
    // 阻止报错，将错误上报到父组件
    formItemContext?.validate('change').catch(() => {});
  },
);

onMounted(() => {
  updateModelValue(props.modelValue);
});

const showEyeIcon = computed(
  () =>
    props.modelValue &&
    props.type === 'password' &&
    props.showPassword &&
    !props.disabled &&
    !props.readonly,
);
const passwordVisiable = ref(false);

function updatePasswordVisable() {
  passwordVisiable.value = !passwordVisiable.value;
  nextTick(() => {
    input.value!.focus();
  });
}

const showClearIcon = computed(
  () =>
    props.modelValue && props.clearable && !props.readonly && !props.disabled,
);

function handleClear() {
  model.value = '';
  emit('input', '');
}

function updateModelValue(value: string = '') {
  if (input.value) {
    input.value.value = value;
  }
}

function handleInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit('input', value);
  model.value = value;
}

function handleChange(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit('change', value);
}

function handleFocus(e: FocusEvent) {
  emit('focus', e);
}

function handleBlur(e: Event) {
  // 阻止报错，将错误上报到父组件
  formItemContext?.validate('blur').catch(() => {});
  emit('blur', e);
}
</script>
<template>
  <div :class="[bem.b()]">
    <div :class="[bem.e('group')]">
      <template v-if="slots.prepend">
        <slot name="prepend"></slot>
      </template>
      <div :class="bem.e('wrapper')">
        <template v-if="slots.prefix">
          <slot name="prefix" :class="bem.e('prefix')"></slot>
        </template>
        <input
          ref="input"
          :class="bem.e('inner')"
          :value="modelValue"
          :type="
            type === 'text' ? 'text' : passwordVisiable ? 'text' : 'password'
          "
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <template v-if="showClearIcon">
          <xd-icon :size="16" @click="handleClear">
            <Clear></Clear>
          </xd-icon>
        </template>

        <template v-if="showEyeIcon">
          <xd-icon :size="16" @click="updatePasswordVisable">
            <Eye v-if="passwordVisiable"></Eye>
            <EyeClosed v-else></EyeClosed>
          </xd-icon>
        </template>
        <template v-if="slots.suffix">
          <slot name="suffix"></slot>
        </template>
      </div>

      <template v-if="slots.append">
        <slot name="append"></slot>
      </template>
    </div>
  </div>
</template>
<style scoped></style>
