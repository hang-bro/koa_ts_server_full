/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-05 10:30:46
 */
import fs from 'fs'

import { Get, Controller, NoAuth } from '@/decorator/index'
import { Context } from 'koa'
import path from 'path'
import config from '@/config'

@Controller('/')
export default class indexController {
  @NoAuth('/')
  @Get('', '访问首页')
  /** */
  async index(ctx: Context) {
    const production = process.env.NODE_ENV == 'production'
    if (production) {
      const index_html = path.join(__dirname, '../public/doc/index.html')
      if (fs.existsSync(index_html)) {
        return (ctx.body = fs.readFileSync(index_html).toString())
      }
      return (ctx.body = 'welcome visit koa2 !')
    } else {
      return ctx.response.redirect(`http://localhost:${config.FRONT_PORT}/doc`)
    }
  }
}
