/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-08-29 15:13:41
 */
import path from 'path'

/**自定义打包路径 自动打包到本地nginx服务器中*/
const BUILD_PATH = path.join(__dirname, '../../nginx-1.22.0/html')

/**svg地址 */
const SVG_PATH = path.join(__dirname, '../src/assets/svg')

/** @types 类型声明文件&全局.d.ts文件地址 */
const TYPES_PATH = path.join(__dirname, '../src/@types')

export {
  /** @types 类型声明文件&全局.d.ts文件地址 */
  TYPES_PATH,
  /**svg图片路径 */
  SVG_PATH,
  /**项目打包路径 */
  BUILD_PATH,
}
