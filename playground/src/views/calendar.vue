<script setup lang="ts">
import { ref } from 'vue';

const date = ref(new Date());
// const range = ref([new Date(2024, 1, 26), new Date(2024, 2, 24)]);
</script>
<template>
  <xd-calendar v-model="date"></xd-calendar>
</template>
<style scoped></style>
