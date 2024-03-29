# README

## monorepo

`monorepo` 是一种代码管理方式，相较于传统的方式，只需一个代码仓库管理所有代码。
这里使用 `pnpm` 管理，创建 `pnpm-workspace.yaml` 文件。

## BEM

`BEM` 是一种 CSS 命名规范，它能很好地描述一个元素，也能在一定程度上解决**命名冲突**的问题。

通常使用 `sass` 等预编译器工具，快速生成对应的样式名。

## sass

- `@use`: 导入其他 sass 文件的样式
- `@forward`: 将样式导出
- `@mixin`: 声明公共方法
- `@include`: 调用公共方法
- `$`: 变量
- `#{}`: 表达式
- `&`: 父类
- `&.`: 连接
- `when()`: 条件判断
- `@at-root`: 将样式输出到根层级上，而不是嵌套
- `@content`: 类似于插槽，内容占位

## svg

- fill="currentColor"：使用 color 属性可以设置填充颜色

## 组件

### 定义组件名称

在 `setup` 模式下使用 `defineOptions`，[Vue3.3+支持](https://cn.vuejs.org/api/sfc-script-setup.html#defineoptions)。

```ts
defineOptions({
  name: 'xd-icon',
});
```

Vue3.3 以前安装 `unplugin-vue-define-options`

```shell
pnpm i unplugin-vue-define-options -D
```

需要在配置文件配置，例如 `vite.config.ts`：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import defineOptions from 'unplugin-vue-define-options/vite';

export default defineConfig({
  plugins: [vue(), defineOptions()],
});
```

### 为组件增加 install 方法

```ts
import type { App, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;

export function withInstall<T>(component: T) {
  (component as SFCWithInstall<T>).install = function (app: App) {
    const { name } = component as unknown as { name: string };
    app.component(name, component as SFCWithInstall<T>);
  };
  return component as SFCWithInstall<T>;
}
```

### 组件类型声明

声明全局组件，提供类型提示，方便开发。

```ts
declare module 'vue' {
  export interface GlobalComponents {
    XdIcon: typeof Icon;
  }
}
```

### 支持 jsx/tsx

安装 `@vitejs/plugin-vue-jsx` 插件

```shell
pnpm i @vitejs/plugin-vue-jsx -D
```

使用插件

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
});
```

### defineModel(Vue3.4+)

```ts
// 默认名称为 modelValue
// 之前的做法是在 props 中声明
const model = defineModel<string>({ default: 'defaultValue' });
// 自定义
const custom = defineModel<number>('custom', { default: 0 });

// 修改方法与 ref 相同
// 之前的做法是
// const emit = defineEmits(['update:modelValue']);
// emit('update:modelValue', 'change');
model.value = 'change';
```

## 多层组件嵌套,传递插槽

### 每个层级都写一遍插槽(间接传递)

使用页面

```html
<your-component>
  <template #header="{content}">{content.title}</template>
</your-component>
```

中间组件

```html
<middle-component>
  <template #header="{content}">
    <slot name="header" :content="content"></slot>
  </template>
</middle-component>
```

底层组件

```html
<bottom-component>
  <slot name="header" :content="content"></slot>
</bottom-component>
```

### provide/inject

类型声明

```ts
export interface TreeContext {
  slots: SetupContext['slots'];
}
export const treeInjectKey: InjectionKey<TreeContext> = Symbol();
```

在父组件使用 `provide`

```ts
provide(treeInjectKey, {
  slots: useSlots(),
});
```

在子组件使用 `inject`

```vue
<script setup land="ts">
const treeContext = inject(treeInjectKey);
</script>
<template>
  <div>{{ treeContext.slots.default(node) }}</div>
</template>
```

页面使用

```vue
<template>
  <tree>
    <template #default="{ node }">{{ node.label }}</template>
  </tree>
</template>
```

## 文档

使用 `vitepress` 创建文档

安装

```shell
pnpm add -D vitepress
```

初始化

```shell
npx vitepress init
```

[全局注册组件](https://vitepress.dev/zh/guide/extending-default-theme#registering-global-components)

创建 `.vitepress/theme/index.ts` 文件

```ts
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Icon from '@lxd/components/icon';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(Icon);
  },
} satisfies Theme;
```
