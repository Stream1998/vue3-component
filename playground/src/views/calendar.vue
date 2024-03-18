<script setup lang="ts">
import { ref } from 'vue';

const date = ref(new Date());
</script>
<template>
  {{ date.getTime() }}
  <xd-calendar v-model="date"></xd-calendar>
</template>
<style scoped></style>
