/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-26 14:35:32
 */

import { Get, Post, Controller } from '@/decorator/index'
import response from '@/utils/response'
import fs from 'fs'
import { Context } from 'koa'
import path from 'path'

import translateService from '@/service/translate.service'


@Controller('/api/translate')
export default class translateController {

  @Post("")
  @Get("")
  /** */
  async index(ctx: Context) {

    const data = { /**选择是外链则路由地址需要以`http(s)://`开头 */
      isOutLinkTip: '选择是外链则路由地址需要以`http(s)://`开头',
      /**路由地址 */
      routePath: '路由地址',
      /**路由参数 */
      routeParam: '路由参数',
      /**是否缓存 */
      isCache: '是否缓存',
      /**显示状态 */
      showStatus: '显示状态',
      /**菜单状态 */
      menuStatus: '菜单状态',
    }

    const keys = Object.keys(data).map((item) => {
      // @ts-ignore
      return { key: item, value: data[item], trans: null }
    })



    let str = `const data={\n`
    for (const [index, item] of Object.entries(keys)) {
      // console.log(`item,index ==>`, item, index);
      const trans = await translateService.requestTranslate(item.value) as any
      console.log(`trans ==>`, trans);
      str += `/**${trans[0].src}*/\n`
      str += `${item.key}:"${trans[0].dst}",\n`
    }
    str += `}`
    // fs.writeFileSync(path.join(__dirname, './genData.js'), str, { encoding: 'utf-8' })
    return response.success(ctx, str)
  }
}
