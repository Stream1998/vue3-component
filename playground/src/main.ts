import { createApp } from 'vue';
import App from './App.vue';
import Icon from '@lxd/components/icon';
import Tree from '@lxd/components/tree';
import '@lxd/theme/src/index.scss';

const app = createApp(App);
const plugins = [Icon, Tree];
plugins.forEach(plugin => app.use(plugin));

app.mount('#app');
