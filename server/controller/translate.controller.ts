/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-26 14:35:32
 */

import { Get, Post, Controller, NoAuth } from '@/decorator/index'
import response from '@/utils/response'
import fs from 'fs'
import { Context } from 'koa'
import path from 'path'

import translateService from '@/service/translate.service'

@Controller('/api/translate')
export default class translateController {
  @Post('')
  @NoAuth('/api/translate')
  /** */
  async index(ctx: Context) {
    const { input } = ctx.request.body
    const keys = Object.keys(input).map(item => {
      // @ts-ignore
      return { key: item, value: input[item], trans: null }
    })

    let str = `{\n`
    for (const [index, item] of Object.entries(keys)) {
      // console.log(`item,index ==>`, item, index);
      const trans = (await translateService.requestTranslate(item.value)) as any
      console.log(`trans ==>`, trans)
      str += `  /**${trans[0].src}*/\n`
      str += `  ${item.key}:"${trans[0].dst}",\n`
    }
    str += `}`
    return response.success(ctx, str)
  }
}
