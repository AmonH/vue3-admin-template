import { createApp } from 'vue';

import 'normalize.css'; //引入初始化样式
import '@/assets/css/index.scss';

import App from './App.vue';
import router from './router';
import store from './store';
import { setupStore } from '@/store';
import SvgIcon from '@/assets/icons';
import { globalRegister } from './global';

const app = createApp(App);

app.use(SvgIcon); //引入svg图标
app.use(globalRegister); //注册全局函数或方法
app.use(store);
setupStore(); //重新初始化store内的数据,该处代码不能放到app.use(router)后面，会发生刷新页面后路由不匹配问题
app.use(router);

app.mount('#app');
