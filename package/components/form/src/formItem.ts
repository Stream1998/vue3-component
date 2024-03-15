import type { RuleItem, Values } from 'async-validator';
import { ExtractPropTypes, InjectionKey, PropType } from 'vue';

export type Arrayable<T> = T | T[];

export type Trigger = 'change' | 'blur';

export type FormItemRule = RuleItem & { trigger?: Arrayable<Trigger> };

export type ValidateState = 'success' | 'error' | '';

export const formItemProps = {
  prop: {
    type: String,
  },
  label: {
    type: String,
  },
  rules: {
    type: Object as PropType<Arrayable<FormItemRule>>,
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
};

export type FormItemProps = Partial<ExtractPropTypes<typeof formItemProps>>;

export interface FormItemContext {
  validate: (
    trigger?: Trigger,
    callback?: (state: ValidateState, error?: Values) => void
  ) => Promise<void>;
}

export const FormItemInjectKey: InjectionKey<FormItemContext> = Symbol();
