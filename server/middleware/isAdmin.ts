import { Context, Next } from 'koa'
import { verify } from '@/utils/jwt'
import prisma from '@/utils/prismaClient'
import response from '@/utils/response'

/**
 * 验证是否是管理员
 */
async function isAdmin(ctx: Context, next: Next) {
  /**
   *  从 token 解析邮箱
   */
  const { result } = verify(ctx.header['authorization'])

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: result.data.email
      }
    })
    const role = await prisma.role.findUnique({
      where: {
        id: user.roleId
      }
    })
    const isAdmin = role && role.key == 'admin'

    if (!isAdmin) return response.error(ctx, '权限不足')
  } catch (error) {
    return response.error(ctx, '权限不足')
  }

  await next()
}

export default isAdmin
