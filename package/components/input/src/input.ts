import { ExtractPropTypes, PropType } from 'vue';

type Type = 'text' | 'password';

export const inputProps = {
  type: {
    type: String as PropType<Type>,
    default: 'text',
  },
  placeholder: String,
  modelValue: String,
  disabled: Boolean,
  readonly: Boolean,
  clearable: Boolean,
  showPassword: Boolean,
} as const;

export type InputProps = Partial<ExtractPropTypes<typeof inputProps>>;

export const inputEmits = {
  'update:modelValue': (value: string) => typeof value === 'string',
  input: (value: string) => typeof value === 'string',
  change: (value: string) => typeof value === 'string',
  focus: (e: FocusEvent) => e instanceof FocusEvent,
  blur: (e: Event) => e instanceof Event,
  // ...
};

export type InputEmits = typeof inputEmits;
