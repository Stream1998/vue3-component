import { Dayjs } from 'dayjs';
import { ExtractPropTypes, PropType } from 'vue';

export type DateRange = [Date, Date];

export type DateInfo = {
  date: Dayjs;
  type: string;
};

export const calendarProps = {
  modelValue: {
    type: Date,
    default: new Date(),
  },
  range: {
    type: Array as unknown as PropType<DateRange>,
  },
} as const;

export type CalendarProps = ExtractPropTypes<typeof calendarProps>;

export const calendarEmits = {
  'update:modelValue': (value: Date) => value,
};

export type CalendarEmits = typeof calendarEmits;
