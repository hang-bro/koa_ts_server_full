/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-21 18:57:36
 */
import { validator } from '@/config/validator'
import { Delete, Get, Post, Controller, Put, NoAuth } from '@/decorator/index'
import isAdmin from '@/middleware/isAdmin'
import userService from '@/service/user.service'
import response from '@/utils/response'
import { useQuery } from '@/utils/useQuery'
import joi from 'joi'
import { Context } from 'koa'

// 添加Controller前缀
@Controller('/api/users')
export default class userController {
  @NoAuth('/api/users')
  @Get('', '获取用户')
  /**获取用户 */
  async get(ctx: Context) {
    const { data, total, error } = await userService.getList(useQuery(ctx))

    // if (error) return response.error(ctx,'查询出错,请检查参数!')
    if (error) return response.page(ctx)

    /**
     * 密码不回显
     */
    data.forEach(item => delete item.password)
    const sleep = () => new Promise<void>((resolve, reject) => setTimeout(resolve, 10000))
    await sleep()
    return response.page(ctx, { data, total })
  }
  @Post('/seed', '填充用户（开发环境才可使用）')
  /**获取用户 */
  async seed(ctx: Context) {
    const production = process.env.NODE_ENV == 'production'

    if (!production) return response.success(ctx)

    // return response.success(ctx, await userService.create(+ctx.request.body.length))
  }

  @Post('/queryById', '查询某个用户')
  /**查询某个用户 */
  async queryById(ctx: Context) {
    const schema = joi.object({
      id: joi.string().required()
    })
    const {
      error,
      value: { id }
    } = schema.validate(ctx.request.body)

    if (error) return response.error(ctx, error.message)

    const data = await userService.queryById(id)

    if (!data) return response.error(ctx, '用户不存在!')

    return response.success(ctx, data)
  }

  @Get('/noPage', '获取用户不分页')
  /**获取用户不分页 */
  async noPage(ctx: Context) {
    return response.success(ctx, await userService.noPage())
  }

  @Post('', '新增用户')
  /**新增用户 */
  async add(ctx: Context) {
    const schema = joi.object().keys({
      username: validator.username,
      password: validator.password,
      email: validator.email,
      address: validator.address,
      avatar: joi.string(),
      roleId: joi.number()
    })
    const { error, value } = schema.validate(ctx.request.body, { stripUnknown: true })
    if (error) return response.error(ctx, error.message)

    const { email } = value
    // 邮箱是否注册
    const flag = await userService.checkEmailRegisted(email)

    if (flag) return response.error(ctx, '邮箱已经注册过了,请找回密码或者直接登录!')

    return response.success(ctx, await userService.add(value))
  }

  @Delete('/:ids', '删除用户', [isAdmin])
  /**删除用户 */
  async del(ctx: Context) {
    const schema = joi.object({
      ids: joi.string().required()
    })
    const {
      error,
      value: { ids }
    } = schema.validate(ctx.params)

    if (error) return response.error(ctx, error.message)

    const { error: e } = await userService.del(ids)

    if (e) return response.error(ctx, e.message)

    return response.success(ctx)
  }

  @Put('', '修改用户', [isAdmin])
  /**修改用户 */
  async edit(ctx: Context) {
    const { error } = await userService.edit(ctx.request.body)

    if (error) return response.error(ctx, error.message)

    return response.success(ctx)
  }

  @Post('/resetPwd', '重置密码', [isAdmin])
  /**重置密码 */
  async resetPwd(ctx: Context) {
    const schema = joi.object({
      userId: joi.string().required()
    })

    const {
      error: e,
      value: { userId }
    } = schema.validate(ctx.request.body)

    if (e) return response.error(ctx, e.message)

    const { error } = await userService.resetPwd(userId)

    if (error) return response.error(ctx, error.message)

    return response.success(ctx)
  }
}
