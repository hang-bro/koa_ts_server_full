/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-08 15:34:18
 */
export type IParam = {
  pageSize: string | number | string[] | undefined
  pageIndex: string | number | string[] | undefined
}

export type IPagination = {
  skip: number;
  take: number;
}
/** 分页 */
export const usePagination = (ctx: any):IPagination => {
  const { pageSize, pageIndex } = ctx.query as IParam
  let size = pageSize ? +pageSize : 10;
  let index = pageIndex ? +pageIndex : 1;
  return {
    skip: ((index - 1) * size), // 跳过前 n 个结果
    take: size, // 返回最多 多少 个结果
  }
}