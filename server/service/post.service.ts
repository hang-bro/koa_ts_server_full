import { IQuery } from '@/utils/useQuery'
import prisma from '@/utils/prismaClient'
import { dbLogger } from '@/logger'

class postService {
  /**查询 */
  async getList(data: IQuery) {
    const { page, query } = data
    try {
      const data = await prisma.post.findMany({ ...page, ...query })

      const total = await prisma.post.count(query)

      return { data, total }
    } catch (error) {
      console.log('error.message ==>', error.message)
      dbLogger.error(error.message)
    }
  }

  /**获取用户不分页 */
  async noPage() {
    return await prisma.post.findMany()
  }

  /**新增 */
  async add(data: any) {
    return await prisma.post.create({
      data: data
    })
  }

  /**删除 */
  async del(ids: string) {
    try {
      for (const id of ids.split(',')) {
        await prisma.post.delete({ where: { id: +id } })
      }
      return true
    } catch (error) {}
  }

  /**修改 */
  async edit(data: any) {
    const { id } = data
    try {
      return await prisma.post.update({
        where: { id },
        data
      })
    } catch (error) {}
  }
}
export default new postService()
