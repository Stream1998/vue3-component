<script setup lang="ts">
import { ref } from 'vue';
import { BaseType } from '@lxd/components/tree';
// import { TreeOptions, TreeNode } from '@lxd/components/tree';

function createData(level = 4, baseKey = ''): any {
  if (!level) return undefined;
  const repeat = (num: number, token: unknown) => new Array(num).fill(token);
  return repeat(5 - level, undefined).map((_, index) => {
    const key = '' + baseKey + level + index;
    return {
      label: createLabel(level),
      key,
      children: createData(level - 1, key),
    };
  });
}
function createLabel(level: number): string {
  if (level === 4) return '道生一';
  if (level === 3) return '一生二';
  if (level === 2) return '二生三';
  if (level === 1) return '三生万物';
  return '';
}

// 异步加载
// function createData(): TreeOptions[] {
//   return [
//     {
//       label: createLabel(0),
//       key: '0',
//       isLeaf: false,
//     },
//     {
//       label: createLabel(0),
//       key: '1',
//       isLeaf: false,
//       disabled: true,
//     },
//   ];
// }

// function onLoad(node: TreeNode): Promise<TreeOptions[]> {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve([
//         {
//           label: createLabel(node.level + 1),
//           key: node.key + '' + node.level,
//           isLeaf: node.level + 1 === 3,
//         },
//       ]);
//     }, 1000);
//   });
// }

// function createLabel(level: number): string {
//   if (level === 0) return '道生一';
//   if (level === 1) return '一生二';
//   if (level === 2) return '二生三';
//   if (level === 3) return '三生万物';
//   return '';
// }

const data = ref(createData());

const selectKeys = ref<BaseType[]>(['40']);
const checkedKeys = ref<BaseType[]>(['40']);
const expandedKeys = ref<BaseType[]>(['40']);
</script>
<template>
  <xd-tree
    v-model:default-selected-keys="selectKeys"
    v-model:default-checked-keys="checkedKeys"
    v-model:default-expanded-keys="expandedKeys"
    selectable
    :data="data"
    :show-checkbox="true"
  >
    <template #label="{ node }"> {{ node.key }} - {{ node.label }} </template>
  </xd-tree>
</template>
<style scoped></style>
