<script setup lang="ts">
import { Type } from '@lxd/components/button';
import CaretRight from '@lxd/icons/src/CaretRight';
function handleClick() {
  console.log('点击');
}
function handleMousedown() {
  console.log('按下');
}
const buttonTypes: Type[] = ['primary', 'success', 'warning', 'danger', 'info'];
</script>
<template>
  <h4>按钮类型</h4>
  <div class="btn-list">
    <xd-button v-for="(type, index) in buttonTypes" :key="index" :type="type">
      {{ type }}
    </xd-button>
  </div>
  <h4>有图标的按钮</h4>
  <xd-button
    type="success"
    placement="right"
    @click="handleClick"
    @mousedown="handleMousedown"
  >
    <template #icon>
      <xd-icon :size="16" color="#fff">
        <CaretRight></CaretRight>
      </xd-icon>
    </template>
    <span>按钮</span>
  </xd-button>
</template>
<style scoped>
.btn-list {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
</style>
