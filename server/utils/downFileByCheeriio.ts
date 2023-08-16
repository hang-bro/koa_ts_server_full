/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-09 13:17:16
 */
import fs from 'fs'
import cheerio from 'cheerio'
import request from 'request'
import path from 'path'
import regex from './regex'
import axios from 'axios'

/**
 * 获取页面 body
 * @param src 网站地址
 * @returns html->body
 */
const getHtmlBody = async (src: string): Promise<string> => {
	return new Promise(async (resolve, reject) => {
		const { data } = await axios.get(src, { responseType: 'text', timeout: 10000 }).catch(e => e)
		setTimeout(() => resolve(data || ''), 200)
	})
}
export type IDownloadFile = { url: string, fileName: string }

const downloadFile = async (item: IDownloadFile, dirPath = 'hotPicture') => {
	return new Promise<void>(async (resolve, reject) => {
		/**保存文件位置 */
		const saveDirName =
			path.join(__dirname, `../public/download/${dirPath}/`)

		if (!fs.existsSync(saveDirName)) fs.mkdirSync(saveDirName)

		request(item.url).pipe(fs.createWriteStream(saveDirName + item.fileName, 'utf-8'))
		
		resolve()
	})
}
// getHtmlBody('https://www.wallhaven.cc/').then(async (res: any) => {
// 	let fileList: any = []
// 	const $ = cheerio.load(res)
// 	$('img').each((index, ele) => {
// 		const imgSrc = ele?.attribs['data-cfsrc'] || ''
// 		if (regex.httpUrl.test(imgSrc)) {
// 			const fileType = '.' + imgSrc.split('/').pop()?.split('.').pop()
// 			let obj = {
// 				id: index,
// 				src: imgSrc,
// 				fileType: fileType,
// 				name: Math.random().toString().slice(2) + fileType,
// 			}
// 			fileList.push(obj)
// 		}
// 	})
// 	for (let item of fileList) {
// 		await downloadFile(item)
// 	}
// })

export { getHtmlBody, downloadFile }
