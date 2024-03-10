import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import Icon from '@lxd/components/icon';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(Icon);
  },
} satisfies Theme;
