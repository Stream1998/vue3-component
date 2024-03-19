<script setup lang="ts">
import createNamespace from '@lxd/utils/createBEM';
import { DateInfo, calendarEmits, calendarProps } from './calendar';
import dayjs from 'dayjs';
import { ref, computed, watch } from 'vue';

defineOptions({
  name: 'xd-calendar',
});
const props = defineProps(calendarProps);
const emits = defineEmits(calendarEmits);
const bem = createNamespace('calendar');

const today = ref(dayjs(props.modelValue));
const range = computed(() => {
  const result = props.range?.map(v => dayjs(v)) ?? [];
  if (result.length === 2) {
    const diff = result[1].diff(result[0], 'day') + 1;
    if (result[0].isAfter(result[1])) {
      throw new Error('起始时间不能大于结束时间');
    } else if (diff > 42) {
      throw new Error('时间间隔大于42天');
    } else if (diff % 7 !== 0) {
      throw new Error('时间间隔不是7的倍数');
    }
    return result;
  } else {
    return [];
  }
});

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
  const prevMonthDays = Array.from({ length: weekOfFirstDay }).map((_, i) => ({
    date: firstDay.subtract(weekOfFirstDay - i, 'day'),
    type: 'previous',
  }));
  const currentMonthDays = Array.from({ length: days }).map((_, i) => ({
    date: firstDay.add(i, 'day'),
    type: 'current',
  }));
  if (range.value.length === 2) {
    list.push(
      ...prevMonthDays.filter(
        v =>
          range.value[0].isSame(v.date, 'day') ||
          range.value[0].isBefore(v.date, 'day'),
      ),
      ...currentMonthDays
        .filter(
          v =>
            range.value[0].isSame(v.date, 'day') ||
            range.value[0].isBefore(v.date, 'day'),
        )
        .filter(
          v =>
            range.value[1].isSame(v.date, 'day') ||
            range.value[1].isAfter(v.date, 'day'),
        ),
    );
    const nextMonthDays = Array.from({ length: 7 - (list.length % 7) }).map(
      (_, i) => ({ date: lastDay.add(i + 1, 'day'), type: 'next' }),
    );
    list.push(
      ...nextMonthDays.filter(
        v =>
          range.value[1].isSame(v.date, 'day') ||
          range.value[1].isAfter(v.date, 'day'),
      ),
    );
  } else {
    list.push(...prevMonthDays, ...currentMonthDays);
    const nextMonthDays = Array.from({ length: 7 - (list.length % 7) }).map(
      (_, i) => ({ date: lastDay.add(i + 1, 'day'), type: 'next' }),
    );
    list.push(...nextMonthDays);
  }
  const result = Array.from({ length: Math.ceil(list.length / 7) }).map(
    (_, i) => {
      const start = i * 7;
      return list.slice(start, start + 7);
    },
  );
  return result;
});

function isValid(date) {
  if (range.value.length === 2) {
    return (
      (date.isSame(range.value[0], 'day') ||
        date.isAfter(range.value[0], 'day')) &&
      (date.isBefore(range.value[1], 'day') ||
        date.isSame(range.value[1], 'day'))
    );
  }
  return true;
}

function prevYear() {
  const date = today.value.subtract(1, 'year');
  isValid(date) && (today.value = date);
}

function nextYear() {
  const date = today.value.add(1, 'year');
  isValid(date) && (today.value = date);
}

function prevMonth() {
  const date = today.value.subtract(1, 'month');
  isValid(date) && (today.value = date);
}
function nextMonth() {
  const date = today.value.add(1, 'month');
  isValid(date) && (today.value = date);
}
function backToday() {
  const date = dayjs();
  isValid(date) && (today.value = date);
}

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
          <xd-button type="primary" @click="prevYear">
            <span>上一年</span>
          </xd-button>
          <xd-button type="primary" @click="prevMonth">
            <span>上一月</span>
          </xd-button>
          <xd-button type="primary" @click="backToday">
            <span>回到今天</span>
          </xd-button>
          <xd-button type="primary" @click="nextMonth">
            <span>下一月</span>
          </xd-button>
          <xd-button type="primary" @click="nextYear">
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
