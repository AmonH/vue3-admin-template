import { App } from 'vue';
import { formatUtcString } from '@/utils/date-format';
import capitalize from 'lodash/capitalize';

export default {
  //注册全局函数
  install: (app: App) => {
    app.config.globalProperties.$filters = {
      formatTime(value: string) {
        return formatUtcString(value);
      },
      capitalize
    };
  }
};
