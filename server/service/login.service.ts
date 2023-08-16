/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-07 16:27:26
 */

import prisma from "@/utils/prismaClient"
import { decrypt, encrypt } from '@/utils/crypto';

 class LoginService {

	/**检查邮箱是否存在 */
	async checkEmailExist(email: string) {
		return await prisma.user.findFirst({ where: { email } })
	}

	/**登录 */
	async login(email: string, password: string) {
		const user = await prisma.user.findUnique({
			where: { email, }
		})
		if (user && decrypt(user?.password) == password) {
			return user
		}
	}
}


export default new LoginService()