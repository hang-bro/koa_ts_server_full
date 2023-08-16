/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-27 09:36:03
 */

import { Post, Controller } from '@/decorator/index'
import response from '@/utils/response'
import Joi from 'joi'
import { Context } from 'koa'

@Controller('/api/shell')
export default class shellController {

  @Post("")
  /** */
  async index(ctx: Context) {
    const schema = Joi.object({
      cmd: Joi.string().required(),
    })
    const { error, value: { cmd } } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)
    return response.success(ctx, cmd)
  }

}
