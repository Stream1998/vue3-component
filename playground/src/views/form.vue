<script setup lang="ts">
import { FormInstance } from '@lxd/components';
import { reactive, ref } from 'vue';

const model = reactive({
  username: '',
  password: '',
});

const formRef = ref<FormInstance>();

function validateForm() {
  formRef.value?.validate((state, errors) => {
    console.log(state, errors);
  });
}
</script>
<template>
  <div>
    <xd-form
      ref="formRef"
      :model="model"
      :rules="{
        username: {
          len: 10,
          message: '账号必须是10位',
          trigger: ['change', 'blur'],
        },
      }"
    >
      <xd-form-item
        prop="username"
        label="账号"
        :rules="[
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          },
        ]"
      >
        <xd-input
          v-model="model.username"
          type="text"
          placeholder="请输入账号"
          clearable
        ></xd-input>
      </xd-form-item>
      <xd-form-item
        prop="password"
        label="密码"
        :rules="[
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 8,
            max: 10,
            message: '密码范围 8-10',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <xd-input
          v-model="model.password"
          type="password"
          placeholder="请输入密码"
          show-password
        ></xd-input>
      </xd-form-item>
      <xd-form-item>
        <xd-button type="primary" @click="validateForm">提交</xd-button>
      </xd-form-item>
    </xd-form>
  </div>
</template>
<style scoped></style>
