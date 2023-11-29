
/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-29 17:24:23
 */
import { Random, mock } from 'mockjs'
import { http } from '@/http'
import '@/assets/css/base.css'

export const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time))

export type IMock = typeof mock
export type IRandom = typeof Random
export type ISleep = typeof sleep
export { mock, Random }

/**全局注入相关内容 */
export const globalInject = () => {
  return new Promise<void>((resolve, reject) => {
    window.mock = mock
    window.Random = Random
    window.sleep = sleep
    window.http = http
    resolve()
  })
}