import { withInstall } from '@lxd/utils/withInstall';
import _Form from './src/form.vue';
import _FormItem from './src/formItem.vue';

const Form = withInstall(_Form);
const FormItem = withInstall(_FormItem);

export { Form, FormItem };
export type FormInstance = InstanceType<typeof Form>;

export * from './src/form';
export * from './src/formItem';

declare module 'vue' {
  export interface GlobalComponents {
    XdForm: typeof Form;
    XdFormItem: typeof FormItem;
  }
}
