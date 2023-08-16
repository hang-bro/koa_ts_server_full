/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-01-11 17:06:21
 */
interface IRegex {
	/**检测是否为网址 */
	httpUrl: RegExp
	/**以http(s)开头 */
	startWithHttp: RegExp
	/**用户名正则，4到16位（字母，数字，下划线，减号） */
	userName: RegExp
	/**邮箱 */
	email: RegExp
	/**手机号 */
	phone: RegExp
	[props: string]: RegExp
}
const httpUrl =
	/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
const startWithHttp = /(http|https):\/\/([\w.]+\/?)\S*/
const userName = /^[a-zA-Z0-9_-]{4,16}$/
const email = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
const phone = /^[1][3,4,5,7,8,9][0-9]{9}$/
/**正则集和 */
const regex: IRegex = {
	httpUrl,
	startWithHttp,
	userName,
	email,
	phone,
}
export default regex
// 给价格加入符号作为千分位， 默认使用逗号
export const formatPrice = (number: any, sign: any = ',') => {
	if (number) {
		var parts = number.toString().split('.')
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sign)
		return parts.join('.')
	} else {
		return ''
	}
}
// 给价格(千分位)去除符号 (,)
export const delComma = (num: any) => {
	if (num === undefined || num === null || num === '') {
		return null
	}
	num = num.toString()
	num = num.replace(/[ ]/g, '') //去除空格
	num = num.replace(/,/gi, '')
	return Number(num)
}
