import axios from 'axios';
import { Toast } from 'antd-mobile';

const instance = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: function(data) {
    return JSON.stringify(data);
  },
  transformResponse: function(data) {
    return JSON.parse(data);
  }
});

let cancel;
let pending = {};
// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 发起请求时，取消掉当前正在进行的相同请求
    if (pending[config.url]) {
      pending[config.url]('操作取消');
      pending[config.url] = cancel;
    } else {
      pending[config.url] = cancel;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器即异常处理
instance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (!axios.isCancel(err)) {
      if (err && err.response) {
        let { data } = err.response;
        switch (err.response.status) {
          case 400:
            err.tips = data.message || '错误请求';
            break;
          case 401:
            break;
          case 403:
            err.tips = data.message || '拒绝访问';
            break;
          case 404:
            err.tips = data.message || '请求错误,未找到该资源';
            break;
          case 405:
            err.tips = data.message || '请求方法未允许';
            break;
          case 408:
            err.tips = data.message || '请求超时';
            break;
          case 422: {
            const { data } = err.response;
            err.tips = data.message || '请求错误';
            break;
          }
          case 500:
            err.tips = data.message || '服务器端出错';
            break;
          case 501:
            err.tips = data.message || '网络未实现';
            break;
          case 502:
            err.tips = data.message || '网络错误';
            break;
          case 503:
            err.tips = data.message || '服务不可用';
            break;
          case 504:
            err.tips = data.message || '网络超时';
            break;
          case 505:
            err.tips = data.message || 'http版本不支持该请求';
            break;
          case 429:
            err.tips = '操作太频繁啦';
            break;
          default:
            err.tips = `连接错误${err.response.status}`;
        }
      } else {
        err.tips = '网络不可用，请检查！';
      }
      if (typeof window !== 'undefined') {
        err.tips && Toast.fail(err.tips, 2);
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
