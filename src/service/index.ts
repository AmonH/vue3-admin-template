//service统一出口
import CmRequest from './request';
import { BASE_URL, TIME_OUT } from './config';

import localCache from '@/utils/cache';

//创建单个请求实例
const cmRequest = new CmRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    /*     axios请求拦截器:
     *  - 每一个请求都需要携带token header[token] = 'token'
     *  - 请求时间比较长时，加载loading动画 */
    requestInterceptor: (config) => {
      //携带token的拦截
      const token = localCache.getCache('token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      console.log('请求成功的拦截');
      return config;
    },
    requestInterceptorCatch: (error) => {
      console.log('请求失败的拦截');
      return error;
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截');
      return res;
    },
    responseInterceptorCatch: (error) => {
      console.log('响应失败的拦截');
      return error;
    }
  }
});

/**
 *  如果有多个baseUrl，则可以利用以下创建实例的方式开启，
 *  每个实例都有其对应的拦截器
 *  且可以设置其对应的baseUrl, timeout, 请求或响应的拦截器
 *  const cmRequest2 = new CmRequest({ baseUrl: 'xxx', timeout: xxx})
 *
 */

export default cmRequest;
