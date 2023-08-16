/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-30 14:00:00
 */
import { Description, Get, Post, Controller } from '@/decorator/index';
import response from '@/utils/response';
import { Context } from 'koa';

// 添加Controller前缀
@Controller("/api/admin")
@Description('菜单相关')
export default class AdminController {

  @Get('/')
  async index(ctx: Context) {
    return response.success(ctx, ctx.request.method)
  }

  @Post('/', '获取管理员列表')
  /**获取管理员列表 */
  async getAdminList(ctx: Context) {
    return response.success(ctx, ctx.request.method)
  }

  @Post('/', '保存富文本内容')
  /**保存富文本内容 */
  async saveContent(ctx: Context) {
    return response.success(ctx, ctx.request.method)
  }

  @Post('/', '获取富文本内容')
  /**获取富文本内容 */
  async getPage(ctx: Context) {
    return response.success(ctx, ctx.request.method)
  }
}
