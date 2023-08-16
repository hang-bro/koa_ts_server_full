/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-13 16:58:27
 */
import { AxiosRequestConfig } from 'axios'
import instance from './axios/index'

/**响应返回参数 */
export type IResponse<T> = {
  code: number
  message: string
  total?: number
  data: T
  success: boolean
}

export const uploadConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  },
}

export class Http {
  static get = <T>(url: string, params?: object) => {
    return new Promise<IResponse<T>>((resolve, reject) => {
      instance
        .get(url, { params })
        .then((res) => resolve(res.data))
        .catch((e) => reject(e))
    })
  }

  static post = <T>(url: string, data?: object, config?: AxiosRequestConfig<any>) => {
    return new Promise<IResponse<T>>((resolve, reject) => {
      instance
        .post(url, data, config)
        .then((res) => resolve(res.data))
        .catch((e) => reject(e))
    })
  }

  // 上传方法
  static upload = <T>(url: string, params: object, config: AxiosRequestConfig = uploadConfig) => {
    return new Promise<IResponse<T>>((resolve, reject) => {
      instance
        .post(url, params, config)
        .then((res) => resolve(res.data))
        .catch((e) => reject(e))
    })
  }
}

export type IHttp = {
  get: <T>(url: string, params?: object) => Promise<IResponse<T>>
  post: <T>(url: string, params?: object) => Promise<IResponse<T>>
  put: <T>(url: string, params?: object) => Promise<IResponse<T>>
  delete: <T>(url: string, params?: object) => Promise<IResponse<T>>
  upload: <T>(url: string, data?: object) => Promise<IResponse<T>>
}

/**http请求 */
// @ts-ignore
export const http: IHttp = {}
;['get', 'post', 'put', 'delete', 'upload'].map((method) => {
  switch (method) {
    case 'get':
      return (http[method] = <T>(url: string, params?: object) => {
        return new Promise<IResponse<T>>((resolve, reject) => {
          instance[method](url, { params })
            .then((res) => resolve(res.data))
            .catch((e) => reject(e))
        })
      })

    case 'post':
    case 'put':
      return (http[method] = <T>(url: string, data?: object) => {
        return new Promise<IResponse<T>>((resolve, reject) => {
          instance[method](url, data)
            .then((res) => resolve(res.data))
            .catch((e) => reject(e))
        })
      })
    case 'delete':
      return (http[method] = <T>(url: string, data?: object) => {
        return new Promise<IResponse<T>>((resolve, reject) => {
          instance[method](url, { data })
            .then((res) => resolve(res.data))
            .catch((e) => reject(e))
        })
      })

    case 'upload':
      return (http[method] = <T>(url: string, params: object, config: AxiosRequestConfig = uploadConfig) => {
        return new Promise<IResponse<T>>((resolve, reject) => {
          instance
            .post(url, params, config)
            .then((res) => resolve(res.data))
            .catch((e) => reject(e))
        })
      })
    default:
      break
  }
})


