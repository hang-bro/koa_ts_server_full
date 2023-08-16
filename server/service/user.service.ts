/*
 * @Descripttion:用户
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-10 11:16:54
 */
import { dbLogger } from '@/logger'
import { encrypt } from '@/utils/crypto'
import prisma from '@/utils/prismaClient'
import { createData } from '@/utils/seed'
import { IQuery } from '@/utils/useQuery'
export interface IUserAdd {
  username: string
  email: string
  address: string
  password: string
  avatar: string
  roleId: number
}
interface IUserEdit {
  id: string
  username: string
  address: string
  avatar: string
  email: string
  roleId: number
}
class userService {
  async create(length: number) {
    return await createData(length)
  }

  async queryById(id: string) {
    return await prisma.user.findUnique({ where: { id } })
  }

  /**查询 */
  async getList(data: IQuery) {
    const { page, query, order } = data

    const roles = await this.noPage()

    try {
      const data = await $prisma.user.findMany({
        ...page,
        ...query,
        ...order
      })

      data.forEach(item => {
        const flag = roles.filter(i => i.id == item.roleId + '')
        if (flag.length > 0) {
          // @ts-ignore
          if (!item.roles) {
            // @ts-ignore
            item.roles = flag
          } else {
            // @ts-ignore
            item.roles.concat(flag)
          }
        } else {
          // @ts-ignore
          item.roles = []
        }
      })

      const total = await prisma.user.count(query)

      return { data, total }
    } catch (error) {
      dbLogger.error(error.message)
      return { error }
    }
  }

  /**获取用户不分页 */
  async noPage() {
    return await prisma.user.findMany()
  }

  /**检查邮箱是否注册 */
  async checkEmailRegisted(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  /**新增 */
  async add(data: IUserAdd) {
    return await prisma.user.create({
      data: {
        ...data,
        password: encrypt(data.password)
      }
    })
  }

  /**删除 */
  async del(ids: string) {
    try {
      const arr = ids.split(',')
      if (arr.length == 1) {
        const user = await prisma.user.findUnique({ where: { id: ids } })
        if (user.roleId == 1) {
          return { error: new Error('不能删除管理员') }
        }
      }
      for (const id of arr) {
        const res = await prisma.user.delete({ where: { id, NOT: { roleId: 1 } } })
      }
      return {}
    } catch (error) {
      return { error: error as Error }
    }
  }

  /**修改 */
  async edit(data: IUserEdit) {
    const { id, username, email, address, avatar, roleId } = data
    try {
      await prisma.user.update({
        where: { id },
        data: { avatar, address, email, username, roleId }
      })
      return {}
    } catch (error) {
      return { error: error as Error }
    }
  }

  /**重置密码 */
  async resetPwd(userId: string) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          password: encrypt('123456')
        }
      })
      return {}
    } catch (error) {
      return { error: error as Error }
    }
  }
}

export default new userService()
