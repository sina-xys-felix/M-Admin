import { AxiosRequestConfig } from 'axios';

export interface RequestOptions {
  apiUrl?: string;
  isJoinPrefix?: boolean;
  urlPrefix?: string;
  joinParamsToUrl?: boolean;
  formatDate?: boolean;
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  ignoreRepeatRequest?: boolean;
  joinTime?: boolean;
  withToken?: boolean;
  retry?: {
    count: number;
    delay: number;
  };
}

// 返回的数据格式
export interface Result<T = any> {
  code: number;
  success?: boolean;
  message?: string;
  detail?: string;
  data?: T;
}

export interface AxiosRequestConfigRetry extends AxiosRequestConfig {
  retryCount?: number;
}
