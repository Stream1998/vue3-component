<script setup lang="ts">
import icons from '@lxd/icons/src';
function toCamel(value: string): string {
  return value
    .split('-')
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join('');
}
async function copyIcon(icon: any) {
  const iconName = toCamel(icon.name);
  const text = `<${iconName}></${iconName}>`;
  await navigator.clipboard.writeText(text);
}
</script>

<template>
  <div class="icon-list">
    <template v-for="icon in icons" :key="icon.name">
      <div class="icon-wrapper" @click="copyIcon(icon)">
        <xd-icon :size="32">
          <component :is="icon"></component>
        </xd-icon>
        <span class="icon-name">{{ icon.name }}</span>
      </div>
    </template>
  </div>
</template>
<style scoped lang="scss">
.icon-list {
  display: flex;
  flex-wrap: wrap;
}
.icon-wrapper {
  display: inline-flex;
  width: 120px;
  aspect-ratio: 1;
  flex-direction: column;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  cursor: pointer;
  .icon-name {
    margin-top: 8px;
    user-select: all;
  }
  & + & {
    border-left: 0;
  }
}
</style>
