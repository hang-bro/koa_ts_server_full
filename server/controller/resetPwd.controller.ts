/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-13 17:15:48
 */
import config from '@/config'
import { validator } from '@/config/validator'
import { Controller, NoAuth, Post } from '@/decorator/index'
import resetPwdService from '@/service/resetPwd.service'
import sendMailService from '@/service/sendMail.service'
import response from '@/utils/response'
import dayjs from 'dayjs'
import Joi from 'joi'
import { Context } from 'koa'
const expireTime = config.EMAIL_AUTH_CODE_EXPIRE as string

// 添加Controller前缀
@Controller('/api/resetPwd')
export default class AdminController {
  @NoAuth('/api/resetPwd')
  @Post('', '重置密码')
  /**重置密码 */
  async resetPwd(ctx: Context) {
    const schema = Joi.object({
      email: validator.email,
      code: Joi.string().required(),
      password: validator.password
    })
    const {
      error,
      value: { email, code, password }
    } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)

    const emailExists = await resetPwdService.checkEmailExists(email)
    if (!emailExists) return response.error(ctx, '邮箱不存在,请重新发送验证码')
    const { reset_password_code, reset_password_code_time } = emailExists
    /**间隔时间  秒 */
    const seconds = dayjs(new Date()).diff(reset_password_code_time, 'second')
    if (seconds > +expireTime) return response.error(ctx, '验证码已过期')
    if (reset_password_code != code) return response.error(ctx, '验证码错误')
    await resetPwdService.editPwd({ email, password })
    return response.success(ctx)
  }
  
  @NoAuth('/api/resetPwd/sendEmailCode')
  @Post('/sendEmailCode', '发送邮箱验证码')
  /**发送邮箱验证码 */
  async sendEmailCode(ctx: Context) {
    const schema = Joi.object({
      email: Joi.string().email().required()
    })
    const {
      error,
      value: { email }
    } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)
    const emailExist = await resetPwdService.checkUserEmailExists(email)
    if (!emailExist) return response.error(ctx, '邮箱不存在')
    const { status, message, code } = await sendMailService.send(email)
    if (status === 0) return response.error(ctx, message)
    // 判断邮箱记录是否存在
    const hasEmailRecord = await resetPwdService.hasEmailRecord(email)

    if (!hasEmailRecord) {
      await resetPwdService.addRecord({ email, code })
    } else {
      await resetPwdService.updateRecord({ email, code })
    }
    return response.success(ctx)
  }
}
