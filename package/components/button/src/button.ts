import { ExtractPropTypes, PropType } from 'vue';

export type Size = 'small' | 'middle' | 'large';
export type Type = 'primary' | 'danger' | 'info' | 'success' | 'warning' | '';
export type Placement = 'left' | 'right';
export type NativeType = 'button' | 'submit' | 'reset';

export const buttonProps = {
  size: {
    type: String as PropType<Size>,
    default: 'middle',
  },
  type: {
    type: String as PropType<Type>,
    validate(value) {
      return ['primary', 'danger', 'info', 'success', 'warning'].includes(value)
        ? value
        : '';
    },
    default: '',
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'left',
  },
  nativeType: {
    type: String as PropType<NativeType>,
    default: 'button',
  },
  loading: Boolean,
  disabled: Boolean,
};

export type ButtonProps = Partial<ExtractPropTypes<typeof buttonProps>>;

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
  mousedown: (e: MouseEvent) => e instanceof MouseEvent,
  // ...
};

export type ButtonEmits = typeof buttonEmits;
