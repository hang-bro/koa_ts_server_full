/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-06 21:20:53
 */
import { loading } from '@/components/loading'
import axios, { AxiosError, AxiosResponse } from 'axios'
import 'nprogress/nprogress.css'

import userStore from '@/store/user'
import router from '@/router'
const baseURL = import.meta.env.VITE_BASE_URL + import.meta.env.VITE_BASE_API
const instance = axios.create({
  baseURL, //跨域问题  后端没解决这里要打开  vite.configt.ts 要去设置server proxy
  timeout: 300000, //设置超时
  responseType: 'json',
  withCredentials: true,
  headers: {
    ['Content-type']: 'application/json',
  },
})

/**
 * 上传对应的 actions
 */
export const uploadActions = {
  /**
   * 上传单个图片
   */
  singleImage: baseURL + '/upload',

  /**
   * 上传多个图片
   */
  multipleImages: baseURL + '/upload/images',

  /**
   * 上传单个文件
   */
  singleFile: baseURL + '/upload/file/single',

  /**
   * 上传多个文件
   */
  multipleFiles: baseURL + '/upload/files',

  /**
   * 上传头像
   */
  avatar: baseURL + '/upload/avatar',

  /**
   * 上传视频
   */
  video: baseURL + '/upload/video',

  /**
   * 上传音频
   */
  audio: baseURL + '/upload/audio',
}

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
    config.headers['authorization'] = userStore().token
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
    console.log(e)

    await end()
    // 判断是否服务器端返回的错误
    if (e.response?.data) {
      const { message, statusCode, error } = e.response?.data as IServerError

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
      switch (statusCode) {
        case 401: //未认证 token失效
          router.push('/login')
          break
        default:
          break
      }
    } else {
      ElNotification.error({ message: e.message })
    }

    return { data: {} }
  },
)

export default instance

interface IServerError {
  message: string | string[]
  error: string
  statusCode: number
}
