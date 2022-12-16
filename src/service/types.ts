import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface CmRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface CmRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: CmRequestInterceptors<T>;
  showLoading?: boolean; //是否显示loading动画
}

export interface IDataType<T = any> {
  code: number;
  data: T;
}
