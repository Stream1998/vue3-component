<script setup lang="ts">
import { ref } from 'vue';
import AccountCircle from '@lxd/icons/src/AccountCircle';

function handleInput(value: string) {
  console.log('input', value);
}
function handleChange(value: string) {
  console.log('change', value);
}
function handleFocus(e: FocusEvent) {
  console.log('focus', e);
}
function handleBlur(e: Event) {
  console.log('blur', e);
}
const inputValue = ref('input');
</script>
<template>
  <xd-input
    v-model="inputValue"
    type="password"
    placeholder="请输入"
    show-password
    clearable
    @input="handleInput"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <template #prepend>
      <xd-button>前置内容</xd-button>
    </template>
    <template #prefix>
      <xd-icon>
        <AccountCircle></AccountCircle>
      </xd-icon>
    </template>
    <!-- <template #suffix>
      <xd-icon>
        <Eye></Eye>
      </xd-icon>
    </template> -->
    <template #append>
      <xd-button>后置内容</xd-button>
    </template>
  </xd-input>
</template>
<style scoped></style>
