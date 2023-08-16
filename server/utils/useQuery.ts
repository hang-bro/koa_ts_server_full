/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-07 14:25:47
 */

import { Context } from 'koa'
import { IPagination, usePagination } from './pagination'
export type IQuery = {
  page: IPagination
  order: object
  query: {
    where?: {
      OR: {
        [prop: string]: {
          contains: string
        }
      }[]
    }
  }
}
/** 分页 */
export const useQuery = (ctx: Context): IQuery => {
  const params = ctx.query

  const { orderBy, orderSort } = params

  let order = {}

  if (orderBy && orderSort) {
    order = {
      orderBy: {
        [orderBy as string]: orderSort
      }
    }
    delete params.orderBy
    delete params.orderSort
  }

  const query = {
    where: {
      OR: Object.keys(params)
        .filter(p => p != 'pageSize' && p != 'pageIndex')
        .map(item => {
          return {
            [item]: {
              contains: params[item] as string
            }
          }
        })
    }
  }

  return {
    page: usePagination(ctx),
    query: query.where.OR.length == 0 ? {} : query,
    order
  }
}
