/*
 * @Descripttion:发送邮件
 * @version:
 * @Author: HYH
 * @Date: 2021-10-13 08:59:53
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-08 14:09:31
 */
import nodemailer from 'nodemailer'
import smtpTransport from 'nodemailer-smtp-transport'
import config from '../config'
import { mailLogger } from '../logger'
interface IResponse {
	/**0 失败   1 成功 */
	status: 0 | 1
	message: string
	code: string
}
const transporter = nodemailer.createTransport(smtpTransport({
	service: 'smtp.163.com',
	host: 'smtp.163.com', //邮箱服务的主机，如smtp.qq.com
	port: 465,
	secure: true,
	auth: {
		user: config.nodemailer.user,
		pass: config.nodemailer.pass, //这个是开启`POP3/SMTP/IMAP`的授权码
	},
}))
const sendEmail = async (email: string): Promise<IResponse> => {
	const number: any = Math.random().toString().slice(2, 8)
	const mailOptions = {
		from: config.nodemailer.user, // sender address
		to: email, // list of receivers
		subject: 'hi bro!', //主题是什么
		// text: '这是给用户用来获取验证码的,获取验证码输入验证码即可注册成功', //文本内容
		html: `<h2>[hang-bro]:您的验证码为${number}</h2>`, //html模板
	}
	return new Promise<any>((resolve, reject) => {

		transporter.sendMail(mailOptions, (error, info) => {
			const { accepted, response, messageId } = info
			if (error) {
				mailLogger.info("邮件发送失败: " + error)
				reject({
					status: 0,
					message: `邮件发送失败：${error}`,
					code: ''
				})
			} else {
				const message = `发送给"${accepted}"的邮箱，响应:"${response}",messageId:"${messageId}"`
				mailLogger.info(message)
				resolve({
					status: 1,
					message: "邮件发送成功",
					code: number + ''
				});
			}

		})
		transporter.close(); // 如果没用，关闭连接池
	})
}
export default sendEmail
