<script setup lang="ts">
import iconView from './views/icon.vue';
import treeView from './views/tree.vue';
import checkbox from './views/checkbox.vue';
import buttonView from './views/button.vue';
import inputView from './views/input.vue';
import formView from './views/form.vue';
import uploadView from './views/upload.vue';
import { computed } from 'vue';

const components = [
  { name: 'icon', component: iconView, show: false },
  { name: 'tree', component: treeView, show: false },
  { name: 'checkbox', component: checkbox, show: false },
  { name: 'button', component: buttonView, show: false },
  { name: 'input', component: inputView, show: false },
  { name: 'form', component: formView, show: false },
  { name: 'upload', component: uploadView, show: true },
];

const list = computed(() => components.filter(component => component.show));
</script>

<template>
  <template v-for="item in list" :key="item.name">
    <h3>{{ item.name }}</h3>
    <Component :is="item.component"></Component>
    <br />
  </template>
</template>

<style scoped></style>
