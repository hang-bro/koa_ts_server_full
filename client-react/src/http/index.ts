/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-24 10:01:28
 */
import { AxiosRequestConfig } from 'axios'
import { encode, decode } from 'js-base64';
import instance from './axios/index'


/**响应返回参数 */
export type IResponse<T> = {
  code: number
  message: string
  data: T
  success: boolean
}


export const uploadConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
}

class Http {

  static get = <T>(url: string, params?: object,) => {
    return new Promise<IResponse<T>>((resolve, reject) => {
      instance
        .get(url, { params },)
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })
  }

  static post = <T>(url: string, data?: object, config?: AxiosRequestConfig<any>) => {
    return new Promise<IResponse<T>>((resolve, reject) => {
      instance
        .post(url, data, config)
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })
  }

  // 上传方法
  static upload = <T>(url: string, params: object, config: AxiosRequestConfig = uploadConfig) => {
    return new Promise<IResponse<T>>((resolve, reject) => {
      instance
        .post(url, params, config)
        .then(res => resolve(res.data))
        .catch(e => reject(e))
    })
  }

}


/**http请求 */
export const http = {
  get: Http.get,
  post: Http.post,
  upload: Http.upload
}

export type IHttp = typeof http

