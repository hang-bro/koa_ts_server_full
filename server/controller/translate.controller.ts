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
  // @NoAuth('/api/translate')
  /** */
  async index(ctx: Context) {
    const { input, isDev } = ctx.request.body
    const keys = Object.keys(input).map(item => {
      // @ts-ignore
      return { key: item, value: input[item], trans: null }
    })

    let enTrans = `{\n`
    for (const [index, item] of Object.entries(keys)) {
      const trans = (await translateService.requestTranslate(item.value, isDev, 'en')) as any
      console.log(`trans ==>`, trans)
      enTrans += `  /**${trans[0].src}*/\n`
      enTrans += ` '${item.key}':"${trans[0].dst}",\n`
    }
    enTrans += `}`

    let jpTrans = `{\n`
    for (const [index, item] of Object.entries(keys)) {
      const trans = (await translateService.requestTranslate(item.value, isDev)) as any
      console.log(`trans ==>`, trans)
      jpTrans += `  /**${trans[0].src}*/\n`
      jpTrans += `  '${item.key}':"${trans[0].dst}",\n`
    }
    jpTrans += `}`

    return response.success(ctx, { enTrans, jpTrans })
  }
}
