<script setup lang="ts">
import createNamespace from '@lxd/utils/createBEM';
import { DateInfo, calendarEmits, calendarProps } from './calendar';
import dayjs from 'dayjs';
import { ref, computed, watch } from 'vue';

defineOptions({
  name: 'xd-calendar',
});
defineProps(calendarProps);
const emits = defineEmits(calendarEmits);
const bem = createNamespace('calendar');

const today = ref(dayjs());

const weekNames = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
];

const performDays = computed(() => {
  const firstDay = today.value.startOf('month');
  const lastDay = today.value.endOf('month');
  const weekOfFirstDay = firstDay.day();
  const days = today.value.daysInMonth();
  const list: DateInfo[] = [];
  const prevMonthDays = Array.from({ length: weekOfFirstDay }).map((v, i) => ({
    date: firstDay.subtract(weekOfFirstDay - i, 'day'),
    type: 'previous',
  }));
  list.push(...prevMonthDays);
  const currentMonthDays = Array.from({ length: days }).map((v, i) => ({
    date: firstDay.add(i, 'day'),
    type: 'current',
  }));
  list.push(...currentMonthDays);
  const nextMonthDays = Array.from({ length: 42 - list.length }).map((v, i) => {
    return { date: lastDay.add(i + 1, 'day'), type: 'next' };
  });
  list.push(...nextMonthDays);
  const result = Array.from({ length: 6 }).map((_, i) => {
    const start = i * 7;
    return list.slice(start, start + 7);
  });
  return result;
});

watch(today, date => {
  emits('update:modelValue', date.toDate());
});
</script>
<template>
  <div :class="bem.b()">
    <slot name="header">
      <div :class="bem.e('header')">
        <span :class="bem.em('header', 'date')">
          {{ today.format('YYYY-MM-DD') }}
        </span>
        <div :class="bem.em('header', 'operate')">
          <xd-button type="primary" @click="today = today.subtract(1, 'year')">
            <span>上一年</span>
          </xd-button>
          <xd-button type="primary" @click="today = today.subtract(1, 'month')">
            <span>上一月</span>
          </xd-button>
          <xd-button type="primary" @click="today = dayjs()">
            <span>回到今天</span>
          </xd-button>
          <xd-button type="primary" @click="today = today.add(1, 'month')">
            <span>下一月</span>
          </xd-button>
          <xd-button type="primary" @click="today = today.add(1, 'year')">
            <span>下一年</span>
          </xd-button>
        </div>
      </div>
    </slot>
    <div v-once :class="bem.e('week-name')">
      <div v-for="(item, i) in weekNames" :key="i">{{ item }}</div>
    </div>
    <div :class="bem.e('table')">
      <div v-for="(week, i) in performDays" :key="i" :class="bem.e('week')">
        <div
          v-for="(d, j) in week"
          :key="j"
          :class="[
            bem.e('day'),
            bem.is('today', today.isSame(d.date, 'day')),
            bem.is('current', d.type === 'current'),
          ]"
          @click="today = d.date"
        >
          <slot name="date-cell" :date="d.date">
            {{ d.date.format('D') }}
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
