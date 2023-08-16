/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-10 10:10:08
 */
import { Context } from 'koa'
import { encode, decode } from 'js-base64';

/**成功响应 */
function success(
	ctx: Context,
	data: any = null,
	message: string = 'success',
	code: number = 200,
	success: boolean = true,
) {
	// return ctx.body = encode(JSON.stringify({ code, data, message, success }))
	return ctx.body = { code, data, message, success }
}

/**错误响应 */
function error(
	ctx: Context,
	message: string = 'error',
	data: any = null,
	code: number = 5001,
	success: boolean = false,
) {
	// return ctx.body = encode(JSON.stringify({ code, data, message, success }))
	return ctx.body = { code, data, message, success }
}

export type IResponsePage = {
	total?: number
	data?: any[]
}

/**分页响应 */
function page(ctx: Context, result?: IResponsePage, code: number = 200,) {
	if (!result) return ctx.body = { code, data: [], total: 0, }
	const { total, data } = result
	return ctx.body = { code, data: data || [], total: total || 0, }
}

/**列表 */
function list(
	ctx: Context,
	data: any[] = [],
	message: string = 'ok',
	code: number = 200,
	success: boolean = true,
) {
	return ctx.body = { code, data, message, success }
}


export default { success, error, page, list }
