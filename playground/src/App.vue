<script setup lang="ts">
import { ref } from 'vue';
import { TreeOptions, TreeNode } from '@lxd/components/tree';

// function createData(level = 2, baseKey = ''): any {
//   if (!level) return undefined;
//   const repeat = (num: number, token: unknown) => new Array(num).fill(token);
//   return repeat(6 - level, undefined).map((_, index) => {
//     const key = '' + baseKey + level + index;
//     return {
//       label: createLabel(level),
//       key,
//       children: createData(level - 1, key),
//     };
//   });
// }
// function createLabel(level: number): string {
//   if (level === 4) return '道生一';
//   if (level === 3) return '一生二';
//   if (level === 2) return '二生三';
//   if (level === 1) return '三生万物';
//   return '';
// }

// 异步加载
function createData() {
  return [
    {
      label: createLabel(0),
      key: "0",
      isLeaf: false,
    },
    {
      label: createLabel(0),
      key: "1",
      isLeaf: false,
    },
  ]
}

function onLoad(node: TreeNode): Promise<TreeOptions[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{
        label: createLabel(node.level + 1),
        key: node.key + '' + node.level,
        isLeaf: node.level + 1 === 3,
      }])
    }, 1000);
  })
}

function createLabel(level: number): string {
  if (level === 0) return '道生一';
  if (level === 1) return '一生二';
  if (level === 2) return '二生三';
  if (level === 3) return '三生万物';
  return '';
}

const data = ref(createData());
</script>

<template>
  <div>
    <xd-icon color="red" :size="30">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
          <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10M7 9l5 1m5-1l-5 1m0 0v3m0 0l-2 5m2-5l2 5">
          </path>
          <path fill="currentColor" d="M12 7a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"></path>
        </g>
      </svg>
    </xd-icon>
  </div>
  <xd-tree :data="data" :on-load="onLoad"></xd-tree>
</template>

<style scoped></style>
