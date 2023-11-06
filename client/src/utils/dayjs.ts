/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-10 11:52:00
 */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn' // ES 2015
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn') // 全局使用
dayjs.extend(relativeTime)

export default dayjs

export type IDayJs = typeof dayjs
