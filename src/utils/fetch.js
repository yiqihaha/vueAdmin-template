import axios from 'axios';
import {Message, MessageBox} from 'element-ui';
import store from '../store';
import {getToken, setToken} from '@/utils/authStorage';
import router from '@/router'


// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 10000                  // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    if (getToken()) {
        config.headers['authorization'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
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
        if (response.headers['authorization']) {
            setToken(response.headers['authorization'])
        }
        return response
    },
    error => {
        console.log('error : ' + error)
        if (error.response) {
            switch (error.response.status) {
                case 401 : {
                    MessageBox.alert('您的Token已过期，请重新登录！', '错误提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            store.dispatch('FedLogOut').then(() => {
                                location.reload();
                            })
                        }
                    });

                }

                case 500 : {
                    MessageBox.alert('服务器发生异常 ！', '错误提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            location.reload();
                        }
                    });

                }

                default : MessageBox.alert('发生未知错误，请重新登录！', '错误提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        store.dispatch('FedLogOut').then(() => {
                            location.reload();
                        })
                    }
                });
            }
        }
        return Promise.reject(error)
    }
)

export default service;
