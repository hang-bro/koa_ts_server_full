/*
 * @Descripttion:遍历文件夹，获取所有文件夹里面的文件信息
 * @version:
 * @Author: HYH
 * @Date: 2021-10-18 09:24:04
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-24 15:08:46
 */
import fs from 'fs'
import path from 'path'
import config from '../config'
/**
 *
 * @param path 文件路径
 * @returns
 */
function geFileList(path: any) {
	const filesList: any[] = []
	readFile(path, filesList)
	return filesList
}

//遍历读取文件
function readFile(path: string, filesList: any[]) {
	let files = fs.readdirSync(path) //需要用到同步读取
	files.forEach(walk)
	function walk(file: string) {
		let states = fs.statSync(path + '/' + file)
		if (states.isDirectory()) {
			readFile(path + '/' + file, filesList)
		} else {
			//创建一个对象保存信息
			const obj: any = new Object()
			obj.size = states.size //文件大小，以字节为单位
			obj.name = file //文件名
			obj.path = path + '/' + file //文件绝对路径
			filesList.push(obj)
		}
	}
}

//写入文件utf-8格式
function writeFile(fileName: any, data: any) {
	fs.writeFile(fileName, data, 'utf-8', complete)
	function complete() {
		console.log('文件生成成功')
	}
}

/**获取一个目录下的所有文件大小 路径 文件名  由大到小显示*/
const getAllFileSizeInDir = (path: any, singerName: string) => {
	const filesList = geFileList(path)
	filesList.sort((a: { size: number }, b: { size: number }) => {
		return a.size - b.size
	})
	let targetList = []
	let baseUrl = config.getFilePath.singerWorks
	for (let i = 0; i < filesList.length; i++) {
		const item: any = filesList[i]
		let obj = {
			fileName: item.name,
			size: (item.size / 1024).toFixed(2) + 'kb',
			path: baseUrl + singerName + '/' + item.name,
		}
		targetList.push(obj)
	}
	return targetList
}
/**
 * 获取一个目录下的所有 文件名
 * 升序
 */
const getAllFileNameInDir = (path: any) => {
	const filesList = geFileList(path)
	filesList.sort((a: { size: number }, b: { size: number }) => {
		return a.size - b.size
	})
	const fileList = []
	for (let i = 0; i < filesList.length; i++) {
		const item: any = filesList[i]
		fileList.push(item.name)
	}
	return fileList
}
/**获取文件大小 */
function getSize(src: string) {
	const filesList = geFileList(src)
	return filesList
}
// let allFile: any = getSize(
// 	'C:/Users/ASUS/Desktop/Nuxt3/my_first_nuxt3_pro/http/api'
// )
// let template = ''
// let exportTemplate = 'const Apis={'
// for (let item of allFile) {
// 	let filePath = item.path.slice(56)
// 	let split = item.path.split('/')
// 	let apiName: string = split[split.length - 2]
// 	let isEndWithApi: boolean = apiName.endsWith('api')
// 	if (!isEndWithApi) apiName = apiName + '_api'
// 	exportTemplate += apiName + ',\n'
// 	template += `/**  */ \n import ${apiName} from '~/http/api/${filePath.slice(
// 		0,
// 		filePath.length - 3
// 	)}' \n`
// }
// exportTemplate += '} \n export default Apis'
// console.log(template)
// console.log(template + exportTemplate)

export { getAllFileSizeInDir, getAllFileNameInDir, getSize }
