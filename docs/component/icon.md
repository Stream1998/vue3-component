# icon

## Usage

<div>
<xd-icon color="red" :size="30">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        >
          <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10M7 9l5 1m5-1l-5 1m0 0v3m0 0l-2 5m2-5l2 5"
          ></path>
          <path
            fill="currentColor"
            d="M12 7a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"
          ></path>
        </g>
      </svg>
    </xd-icon>
</div>

```vue
<script setup lang="ts"></script>

<template>
  <div>
    <xd-icon color="red" :size="30">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        >
          <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10M7 9l5 1m5-1l-5 1m0 0v3m0 0l-2 5m2-5l2 5"
          ></path>
          <path
            fill="currentColor"
            d="M12 7a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1"
          ></path>
        </g>
      </svg>
    </xd-icon>
  </div>
</template>

<style scoped></style>
```

[svg 图标库](https://icones.js.org/)

## API

### IconProps

| 名称  | 类型             | 默认值 | 说明     |
| ----- | ---------------- | ------ | -------- |
| color | string           | -      | 图标颜色 |
| size  | string \| number | -      | 图标大小 |
