import { ExtractPropTypes } from 'vue';

export const checkboxProps = {
  disabled: Boolean,
  indeterminate: Boolean,
  label: String,
} as const;

export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>;
