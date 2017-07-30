import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store';
import { getToken } from '@/utils/authStorage';
import router from '@/router'


// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
  }

  return config;
}, error => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
})

//respone拦截器
service.interceptors.response.use(
  response => {
      return response
  },
  error => {
      console.log('error : ' + error)
      if(error.response) {
          switch(error.response.status){
              case 401 : {
                  Message({
                      message: '您的登录已经过期，请重新登录！',
                      type: 'error',
                      duration: 5 * 1000
                  });
                  store.dispatch('FedLogOut').then(() => {
                      location.reload();
                  });
              }
          }
      }
    return Promise.reject(error)
  }
)

export default service;
