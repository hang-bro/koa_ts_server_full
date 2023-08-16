import { IQuery } from '@/utils/useQuery'
import prisma from '@/utils/prismaClient'
import { dbLogger } from '@/logger'

class roleService {
  /**查询 */
  async getList(data: IQuery) {
    const { page, query } = data
    try {
      const data = await prisma.role.findMany({ ...page, ...query })

      const total = await prisma.role.count(query)

      return { data, total }
    } catch (error) {
      console.log('error.message ==>', error.message)
      dbLogger.error(error.message)
    }
  }

  /**获取用户不分页 */
  async noPage() {
    return await prisma.role.findMany()
  }

  async queryById(id: number) {
    return await prisma.role.findUnique({ where: { id } })
  }

  /**新增 */
  async add(data: any) {
    return await prisma.role.create({
      data: data
    })
  }

  /**删除 */
  async del(ids: string) {
    try {
      for (const id of ids.split(',')) {
        await prisma.role.delete({ where: { id: +id } })
      }
      return true
    } catch (error) {}
  }

  /**修改 */
  async edit(data: any) {
    try {
      await prisma.role.update({
        where: { id: data.id },
        data
      })
      return {}
    } catch (error) {
      return { error: error as Error }
    }
  }
}
export default new roleService()
