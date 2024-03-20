import { Dayjs } from 'dayjs';
import { ExtractPropTypes, PropType } from 'vue';

export type DateRange = [Date, Date];

export type DateInfo = {
  date: Dayjs;
  type: string;
};

export const calendarProps = {
  range: {
    type: Array as unknown as PropType<DateRange>,
  },
} as const;

export type CalendarProps = ExtractPropTypes<typeof calendarProps>;
