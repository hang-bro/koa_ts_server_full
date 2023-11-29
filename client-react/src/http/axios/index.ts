/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-27 17:14:27
 */
import axios, { AxiosResponse } from 'axios'
import { notification } from 'antd';
import { decode } from 'js-base64';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 20000, //设置超时
  responseType: 'json',
  headers: {
    ['Content-type']: 'application/json'
  }
})


const start = () => {
  NProgress.start();
}

const end = () => {
  NProgress.done();
}

//设置请求拦截器
instance.interceptors.request.use(config => {
  start()
  return config
}, error => {
  end()
  Promise.reject(error)
})

//设置响应拦截器
instance.interceptors.response.use(res => {
  end()
  const { code, message } = JSON.parse(decode(res.data))

  if (code && code !== 200) {
    notification.error({
      message: '错误',
      description: message,
      placement: 'topRight',
      duration: 5
    });
  }
  return { data: JSON.parse(decode(res.data)) } as AxiosResponse

}, error => {
  end()
  notification.error({ message: error.message })
  Promise.reject(error)
})

export default instance
