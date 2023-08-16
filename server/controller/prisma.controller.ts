import { Controller, Post } from '@/decorator/index'
import response from '@/utils/response'
import { Context } from 'koa'
import { $ } from 'zx'

@Controller('/api/prisma')
export default class prismaController {
  @Post('/startPrismaClient', '启动prisma客户端')
  /**查询某个prisma */
  async startPrismaClient(ctx: Context) {
    const res = await $`pnpm run open`
    return response.success(ctx,res)
  }
}
