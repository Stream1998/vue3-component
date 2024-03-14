<script setup lang="ts">
import iconView from './views/icon.vue';
import treeView from './views/tree.vue';
import checkbox from './views/checkbox.vue';
import buttonView from './views/button.vue';
import inputView from './views/input.vue';

const list = [
  { name: 'icon', component: iconView },
  { name: 'tree', component: treeView },
  { name: 'checkbox', component: checkbox },
  { name: 'button', component: buttonView },
  { name: 'input', component: inputView },
];
</script>

<template>
  <template v-for="item in list" :key="item.name">
    <h3>{{ item.name }}</h3>
    <Component :is="item.component"></Component>
    <br />
  </template>
</template>

<style scoped></style>
