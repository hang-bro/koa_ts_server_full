/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-05 13:48:08
 */

import { Controller, Get, Post, controllers } from '@/decorator/index';
import response from '@/utils/response';
import { Context } from 'koa';

@Controller('/api/apis')
export default class apiController {


  @Get("", '获取所有api')
  /** */
  async index(ctx: Context) {
    const apis = [] as any
    controllers.forEach((item) => {
      // 获取每个路由的前缀
      const prefix = item.constructor.prefix;
      let url = item.url;
      if (prefix) url = `${prefix}${url}`; // 组合真正链接
      apis.push({ prefix, url, method: item.method, description: item.description, classDes: item.constructor.description })
    });
    let obj = {} 
    apis.map((item: any) => {
      if (obj[item.prefix]) {
        obj[item.prefix].push(item)
      } else {
        obj[item.prefix] = [item]
      }
    })
    return response.success(ctx, obj)
  }
}
