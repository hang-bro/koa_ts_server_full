/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-14 11:00:48
 */
import prisma from '@/utils/prismaClient'
import { IUserAdd } from './user.service'
import { encrypt } from '@/utils/crypto'
class registerService {
  /**用户表邮箱是否存在 */
  async checkUserEmailExists(email: string) {
    return await prisma.user.findUnique({ where: { email } })
  }

  /**判断邮箱记录是否存在 */
  async hasEmailRecord(email: string) {
    return await prisma.email_send_his.findFirst({ where: { email } })
  }

  /**注册 */
  async regist(data: IUserAdd) {
    return await prisma.user.create({
      data: {
        email: data.email,
        username: '用户' + data.email,
        address: '未知',
        password: encrypt(data.password),
      }
    })
  }

  /**创建邮箱发送验证码记录 */
  async addRecord(data: { email: string; code: string }) {
    const { email, code } = data
    return await prisma.email_send_his.create({
      data: {
        email,
        regist_code: code,
        regist_code_time: new Date()
      }
    })
  }

  /**检查注册验证码是否过期 */
  async checkExpire(email: string) {
    return await prisma.email_send_his.findUnique({ where: { email } })
  }

  /**更新邮箱发送验证码记录 */
  async updateRecord(data: { email: string; code: string }) {
    const { email, code } = data
    await prisma.email_send_his.update({
      where: { email },
      data: {
        regist_code: code,
        regist_code_time: new Date()
      }
    })
  }
  /**删除邮箱发送验证码记录 */
  async delRecord(data: { email: string }) {
    const { email } = data
    await prisma.email_send_his.delete({
      where: { email }
    })
  }
}
export default new registerService()
