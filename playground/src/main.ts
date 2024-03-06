import { createApp } from 'vue';
import App from './App.vue';
import Icon from '@lxd/components/icon';
import '@lxd/theme/src/index.scss';

const app = createApp(App);

const plugins = [Icon];
plugins.forEach(plugin => app.use(plugin));

app.mount('#app');
