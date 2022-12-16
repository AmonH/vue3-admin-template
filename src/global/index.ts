import { App } from 'vue';

import registerProperties from './register-properties';
import registerCommon from './register-common';

export function globalRegister(app: App): void {
  app.use(registerProperties);
  app.use(registerCommon);
}
