/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-06 21:20:53
 */
import axios, { AxiosError, AxiosResponse } from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import userStore from '@/store/user'
import { storeToRefs } from 'pinia'
import router from '@/router'
const { token } = storeToRefs(userStore())

const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API,//跨域问题  后端没解决这里要打开  vite.configt.ts 要去设置server proxy
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 300000, //设置超时
  responseType: 'json',
  headers: {
    ['Content-type']: 'application/json',
  },
})

const start = () => {
  NProgress.start()
}

const end = () => {
  NProgress.done()
}

//设置请求拦截器
instance.interceptors.request.use(
  (config) => {
    config.headers['authorization'] = token.value || ''
    start()
    return config
  },
  (error) => {
    end()
    return Promise.reject(error)
  },
)

//设置响应拦截器
instance.interceptors.response.use(
  (res) => {
    end()
    const { code, message } = res.data
    if (code && code !== 200) {
      ElNotification.warning(message)
    }
    switch (code) {
      case 4001: //未认证 token失效
        // case 5001: //未认证 token失效
        router.push({
          path: '/login',
        })
        break
      default:
        break
    }
    return { data: res.data } as AxiosResponse
  },
  (error: AxiosError) => {
    end()
    ElNotification.error(error.message || error.response.statusText)
    return { data: {} }
  },
)

export default instance
