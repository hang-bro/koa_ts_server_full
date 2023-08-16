/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-14 10:48:19
 */
import { getHtmlBody, downloadFile } from '../utils/downFileByCheeriio'
 class getThirdInterfaceService {
	/**获取html body */
	async getBody(src: string) {
		return await getHtmlBody(src)
	}
	/**下载文件 */
	async download(item: any, dirName?: string) {
		return await downloadFile(item, dirName)
	}
}
export default new getThirdInterfaceService()