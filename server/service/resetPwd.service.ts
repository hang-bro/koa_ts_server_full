/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-08 21:41:22
 */
import { encrypt } from "@/utils/crypto"
import prisma from "@/utils/prismaClient"

class resetPwdService {

    /**邮箱验证码表中 邮箱是否存在 */
    async checkEmailExists(email: string) {
        return await prisma.email_send_his.findUnique({ where: { email } })
    }

    /**用户表邮箱是否存在 */
    async checkUserEmailExists(email: string) {
        return await prisma.user.findUnique({ where: { email } })
    }

    /** */
    async hasEmailRecord(email: string) {
        return prisma.email_send_his.findFirst({ where: { email } })
    }

    /**修改密码 */
    async editPwd(data: { email: string, password: string }) {
        try {
            return await prisma.user.update({ where: { email: data.email }, data: { password: encrypt(data.password), } })
        } catch (error) {

        }
    }

    /**判断邮箱发送验证码记录是否存在 */
    async checkEmailSendCode(email: string) {
        return await prisma.email_send_his.findFirst({ where: { email } })
    }

    /**创建邮箱发送验证码记录 */
    async addRecord(data: { email: string, code: string, }) {
        const { email, code, } = data
        return await prisma.email_send_his.create({
            data: {
                email,
                reset_password_code: code,
                reset_password_code_time: new Date(),
            }
        })
    }
    /**更新邮箱发送验证码记录 */
    async updateRecord(data: { email: string, code: string, }) {
        const { email, code, } = data
        await prisma.email_send_his.update({
            where: { email },
            data: {
                reset_password_code: code,
                reset_password_code_time: new Date()
            }
        })
    }
}

export default new resetPwdService()