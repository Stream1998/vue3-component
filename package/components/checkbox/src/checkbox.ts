import { ExtractPropTypes } from 'vue';

export const checkboxProps = {
  modelValue: {
    type: Boolean,
    required: true,
  },
  disabled: Boolean,
  indeterminate: Boolean,
  label: String,
} as const;

export type CheckboxProps = Partial<ExtractPropTypes<typeof checkboxProps>>;

export const checkboxEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
};

export type CheckboxEmits = typeof checkboxEmits;
