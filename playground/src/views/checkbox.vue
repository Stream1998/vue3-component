<script setup lang="ts">
import { ref } from 'vue';
const cat = ref(true);
const sheep = ref(false);
</script>
<template>
  <xd-checkbox v-model="cat">捣蛋猫</xd-checkbox>
  <xd-checkbox v-model="sheep" label="棉悠悠">被覆盖的标签</xd-checkbox>
</template>
<style scoped></style>
