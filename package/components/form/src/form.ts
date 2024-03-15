import { ExtractPropTypes, InjectionKey, PropType } from 'vue';
import type {
  Arrayable,
  FormItemContext,
  FormItemRule,
  ValidateState,
} from './formItem';
import { Values } from 'async-validator';

export const formProps = {
  model: {
    type: Object,
    required: true,
  },
  rules: {
    type: Object as PropType<Record<string, Arrayable<FormItemRule>>>,
  },
  showMessage: Boolean,
} as const;

export type FormProps = Partial<ExtractPropTypes<typeof formProps>>;

export interface FormContext {
  model: object;
  rules: Record<string, Arrayable<FormItemRule>> | undefined;
  addItemContext: (context: FormItemContext) => void;
}

export const FormInjectKey: InjectionKey<FormContext> = Symbol();

export interface FormExpose {
  validate: (callback?: (state: ValidateState, error?: Values) => void) => void;
}
