<script setup lang="ts">
import { XdVirtualList } from '@lxd/components';
import { ref } from 'vue';
import { Random } from 'mockjs';
import Item from '../components/item';
const TOTAL = 100;
const data = Array.from({ length: TOTAL }, (_, i) => ({
  id: i,
  name: Random.name(),
  sentence: Random.csentence(20, 120),
}));
const items = ref(data);
</script>
<template>
  <div style="width: 500px">
    <xd-virtual-list :items="items" :count="10" :size="80" :component="Item">
      <!-- <template #default="{ node: item }">
        <div :data-index="item.id">
          <h3>{{ item.name }}</h3>
          <p>{{ item.sentence }}</p>
        </div>
      </template> -->
    </xd-virtual-list>
  </div>
</template>
<style scoped></style>
