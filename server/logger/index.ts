/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-14 14:50:23
 */
import { getLogger, configure, Logger } from 'log4js'
import config from '../config'
// 从配置里面提取日志信息
configure(config.log)
export const accessLogger = getLogger('access')
export const dbLogger = getLogger('db')
export const mailLogger = getLogger('sendMail')
export const uploadLogger = getLogger('upload')
export const serverLogger = getLogger('server')
export const ffmpegLogger = getLogger('ffmpeg')
export default getLogger()