/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-09 14:21:03
 */
import { Context, Next } from 'koa'
import { verify } from '@/utils/jwt'
import response from '@/utils/response'
import code from '@/config/errorCode'
import { noTokenApis } from '@/decorator/index'

/**验证token */
async function auth(ctx: Context, next: Next) {
  // console.log(`验证token ==>`,noTokenApis);
  const token = ctx.header['authorization'] as string
  const { url, method } = ctx.request

  /**不需要鉴权的路由接口 */
  if (noTokenApis.includes(url)) return await next()

  /**
   * 没有token直接不让访问
   */
  if (!token) return response.error(ctx, '未认证!', null, code.CODE_NEED_LOGIN)

  /**
   * 检验token解析是否成功 失败则退出 给提示信息
   */
  const { error } = verify(token)

  if (error) return response.error(ctx, error.message, null, 4001)

  return await next()
}
export default auth
