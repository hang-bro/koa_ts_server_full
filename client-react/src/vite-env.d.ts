/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-21 18:05:57
 */
/// <reference types="vite/client" />
import { IMock, IRandom, ISleep } from '@/utils/globalInject'
import { IHttp } from '@/http/index'
declare global {
  const Random: IRandom
  const sleep: ISleep
  const mock: IMock;
  const http: IHttp;

  /**注意 定义Window接口 首字母一定要大写 否则会出问题 */
  interface Window {
    mock: IMock;
    Random: IRandom
    sleep: ISleep
    http: IHttp
  }

}