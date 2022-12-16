import { App } from 'vue';
import capitalize from 'lodash/capitalize';
import isEmpty from 'lodash/isEmpty';
import { capitalizedKey, isEmptyKey } from '@/utils/types';

export default {
  //注册全局函数
  install: (app: App) => {
    //使用provide将全局方法注入子组件中
    app.provide(capitalizedKey, capitalize); //将字符串的首字母转为大写
    app.provide(isEmptyKey, isEmpty); //判断数据是否为空
  }
};
