import { Context } from 'koa'
import joi from 'joi'
import { Delete, Get, Post, Controller, Put } from '@/decorator/index'
import response from '@/utils/response'
import { useQuery } from '@/utils/useQuery'
import roleService from '@/service/role.service'

@Controller('/api/role')
export default class roleController {
  @Get('', '获取role')
  /**获取role */
  async get(ctx: Context) {
    return response.page(ctx, await roleService.getList(useQuery(ctx)))
  }

  @Get('/noPage', '获取role不分页')
  /**获取role不分页 */
  async noPage(ctx: Context) {
    return response.success(ctx, await roleService.noPage())
  }

  @Post('/queryById', '查询某个role')
  /**查询某个role */
  async queryById(ctx: Context) {
    const schema = joi.object({
      id: joi.string().required()
    })
    const {
      error,
      value: { id }
    } = schema.validate(ctx.request.body)

    if (error) return response.error(ctx, error.message)

    const data = await roleService.queryById(id)

    if (!data) return response.error(ctx, 'role不存在!')

    return response.success(ctx, data)
  }

  @Post('', '新增role')
  /**新增role */
  async add(ctx: Context) {
    const schema = joi.object({
      name: joi.string().required(),
      key: joi.string().required(),
      sort: joi.number().required(),
      remark: joi.string()
    })

    const { error, value } = schema.validate(ctx.request.body)

    if (error) return response.error(ctx, error.message)

    return response.success(ctx, await roleService.add(value))
  }

  @Delete('/:ids', '删除role')
  /**删除role */
  async del(ctx: Context) {
    const schema = joi.object({
      ids: joi.string().required()
    })
    const {
      error,
      value: { ids }
    } = schema.validate(ctx.params)

    if (error) return response.error(ctx, error.message)

    const flag = await roleService.del(ids)

    if (flag) return response.success(ctx)

    return response.error(ctx, 'role不存在')
  }

  @Put('', '修改role')
  /**修改role */
  async edit(ctx: Context) {
    const { error } = await roleService.edit(ctx.request.body)

    if (error) return response.error(ctx, error.message)

    return response.success(ctx)
  }
}
