/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-14 10:44:49
 */
import sendMail from '@/utils/sendEmail'

class sendMailService {
	async send(email: string) {
		return await sendMail(email)
	}
}
export default new sendMailService()