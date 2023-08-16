/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-14 10:58:03
 */
import { Context } from 'koa'

 class AdminService {
	/**获取管理员列表 */
	getAdminList() {
		return true
	}
	getAdminListByPage(page: number = 1, limit: number = 15) {
		return true
	}
	/**新增富文本内容 */
	saveContent(content: string) {
		return true
	}
	/**获取富文本内容 */
	getContent(content: string) {
		return true
	}
}
export default new AdminService()