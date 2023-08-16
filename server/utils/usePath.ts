/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-14 11:04:00
 */
import { join } from 'path'
import fs from 'fs'
import config from '../config'
import { getLocalIp } from './getIp'

/**获取绝对路径 */
export const usePath = () => {
  return {
    myProject: 'D:\\我的gitee',
    project: getPath('../', false),
    /**前端地址 */
    frontend: 'D:\\我的项目\\规范模板\\standard_template',
    controller: getPath('../controller', false),
    service: getPath('../service', false),
    /**public文件夹地址 */
    _public: getPath('../public'),
    /**公共资源请求地址 */
    publicPath: getPath('../public'),
    /**上传文件的文件夹地址 */
    upload: getPath('../public/upload'),
    /**日志文件夹地址 */
    logs: getPath('../logs'),
    /**静态资源访问地址 */
    visitPath: `${config.httpType}${getLocalIp()[0]}:${config.server.port}/upload/`,
    /**根目录地址 */
    rootPath: join(__dirname, '../'),
    /**临时文件地址 */
    tempPath: getPath('../public/temp/'),
    /**上传文件报错目录 */
    uploadSavePath: getPath('../public/files/'),
    /**Ip地址 */
    IP: `${config.httpType}${getLocalIp()[0]}`
  }
}

/**
 *
 * @param path 路径
 * @param make 为空时创建文件夹
 * @returns
 */
const getPath = (path: string, makeDir = true) => {
  const dirPath = join(__dirname, path)
  if (!fs.existsSync(dirPath) && makeDir) {
    fs.mkdirSync(dirPath)
  }
  return dirPath
}
