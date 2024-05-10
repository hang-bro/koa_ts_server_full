/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-06 21:20:53
 */
import axios, { AxiosError, AxiosResponse } from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { loading } from '@/components/loading'

import userStore from '@/store/user'
import { storeToRefs } from 'pinia'
import router from '@/router'
const { token } = storeToRefs(userStore())
const instance = axios.create({
  // baseURL: import.meta.env.VITE_BASE_API,//跨域问题  后端没解决这里要打开  vite.configt.ts 要去设置server proxy
  // baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 300000, //设置超时
  responseType: 'json',
  withCredentials: true,
  headers: {
    ['Content-type']: 'application/json',
  },
})

const start = async () => {
  const { open } = await loading()
  // NProgress.start()
  await open()
}

const end = async () => {
  const { close } = await loading()
  // NProgress.done()
  close()
}

//设置请求拦截器
instance.interceptors.request.use(
  async (config) => {
    config.headers['authorization'] = token.value || ''
    await start()
    return config
  },
  async (error) => {
    await end()
    return Promise.reject(error)
  },
)

//设置响应拦截器
instance.interceptors.response.use(
  async (res) => {
    await end()
    const { code, message } = res.data
    if (code && code !== 200) {
      ElNotification.warning(message)
    }

    return { data: res.data } as AxiosResponse
  },
  async (e: AxiosError) => {
    const { message, statusCode, error } = e.response.data as IServerError
    await end()
    // switch (statusCode) {
    //   case 4001: //未认证 token失效
    //     // case 5001: //未认证 token失效
    //     router.push({
    //       path: '/login',
    //     })
    //     break
    //   default:
    //     break
    // }
    const toHtml = (arr: string[]) => {
      let html = `<div>`
      arr.map((m) => {
        html += `<div>${m}</div>`
      })
      html += '</div>'
      return html
    }
    ElNotification.error({
      title: error,
      dangerouslyUseHTMLString: true,
      message: Array.isArray(message) ? toHtml(message) : message,
    })
    return { data: {} }
  },
)

export default instance

interface IServerError {
  message: string | string[]
  error: string
  statusCode: number
}
