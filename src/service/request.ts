import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { CmRequestInterceptors, CmRequestConfig } from './types';

import { ElLoading } from 'element-plus';

const DEAULT_LOADING = true; //默认显示loading

class CmRequest {
  instance: AxiosInstance;
  interceptors?: CmRequestInterceptors;
  showLoading: boolean;
  loading: any;

  constructor(config: CmRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEAULT_LOADING; //此处的config配置为new操作时传入的配置

    //从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    //添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.2)'
          });
        }

        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        this.showLoading && this.loading.close();

        const data = res.data;
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息');
        } else {
          return data;
        }
      },
      (error) => {
        this.showLoading && this.loading.close();

        return error;
      }
    );
  }

  request<T = any>(config: CmRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //可单独对每个独立的请求进行拦截器配置
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      //对单个请求是否显示loading动画进行设置
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          //可单独对每个独立的响应求进行拦截器配置
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          //将showLoading重新设置为true，这样就不会影响下一个请求
          this.showLoading = DEAULT_LOADING;

          resolve(res);
        })
        .catch((error) => {
          this.showLoading = DEAULT_LOADING;
          reject(error);

          return error;
        });
    });
  }

  get<T = any>(config: CmRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }

  post<T = any>(config: CmRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }

  delete<T = any>(config: CmRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }

  patch<T = any>(config: CmRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

export default CmRequest;
