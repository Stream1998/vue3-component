import { createApp } from 'vue';
import App from './App.vue';
import components from '@lxd/components';
import '@lxd/theme/src/index.scss';

const app = createApp(App);

const plugins = Object.values(components);
plugins.forEach(plugin => app.use(plugin));

app.mount('#app');
