/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-07 16:16:09
 */
import { Context, Next } from "koa";
import { accessLogger } from "@/logger";
function access(ctx: Context, next: Next) {
  const str = `path=[${ctx.path}],method=[${ctx.method}],origin=[${ctx.headers['origin']}]`
  accessLogger.info(str)
  return next()
}
export default access