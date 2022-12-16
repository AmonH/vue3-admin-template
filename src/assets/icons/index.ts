import type { App } from 'vue';

import SvgIcon from '@/base-ui/svg-icon';

const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext.keys().map(requireContext);

requireAll(req);

export default {
  install: (app: App<Element>) => {
    app.component('SvgIcon', SvgIcon);
  }
};
