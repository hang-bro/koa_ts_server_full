/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-07 11:18:03
 */
import { PrismaClient } from '@prisma/client'
import { dbLogger } from '@/logger'

const prisma = new PrismaClient({
  // 显示日志信息的简写形式，不直观，LogDefinition其中的值emit始终为stdout
  // log: ['query', 'info', 'warn', 'error']
  // 推荐使用这种，LogDefinition其中的值emit设置为event就是显示在控制台的
  log: [
    { level: 'query', emit: 'event' }, // 在控制台显示
    // { level: 'info', emit: 'stdout' }, // 不在控制台显示
    { level: 'info', emit: 'event' }, // 在控制台显示
    { level: 'warn', emit: 'event' }, // 在控制台显示
    { level: 'error', emit: 'event' } // 在控制台显示
  ]
})

// 将4种日志信息显示在控制台
prisma.$on('query', (e: any) => {
  // console.log('query', e)
  // dbLogger.info(e.query)
})

// 将4种日志信息显示在控制台
prisma.$on('info', (e: any) => {
  // console.log('info', e)
})

// 将4种日志信息显示在控制台
prisma.$on('error', (e: any) => {
  // console.log('error', e)
  dbLogger.error(e.message)
})

// 将4种日志信息显示在控制台
prisma.$on('warn', (e: any) => {
  console.log('warn', e)
})

export type IPrisma = typeof prisma

export default prisma
