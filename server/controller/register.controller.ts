/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-13 17:23:25
 */
import config from '@/config'
import { validator } from '@/config/validator'
import { Controller, NoAuth, Post } from '@/decorator/index'
import registerService from '@/service/register.service'
import sendMailService from '@/service/sendMail.service'
import response from '@/utils/response'
import dayjs from 'dayjs'
import Joi from 'joi'
import { Context } from 'koa'
const expireTime = config.EMAIL_AUTH_CODE_EXPIRE as string

// 添加Controller前缀
@Controller('/api/register')
export default class AdminController {
  @NoAuth('/api/register/sendEmailCode')
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
    const emailExist = await registerService.checkUserEmailExists(email)
    if (emailExist) return response.error(ctx, '邮箱已存在')
    const { status, message, code } = await sendMailService.send(email)
    if (status === 0) return response.error(ctx, message)
    // 判断邮箱记录是否存在
    const hasEmailRecord = await registerService.hasEmailRecord(email)
    if (!hasEmailRecord) {
      await registerService.addRecord({ email, code })
    } else {
      await registerService.updateRecord({ email, code })
    }
    return response.success(ctx)
  }

  @Post('', '注册 用户 ')
  /**注册 用户 */
  async regist(ctx: Context) {
    const schema = Joi.object({
      password: validator.password,
      email: validator.email,
      code: Joi.string()
    })
    const { error, value } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)

    const { email, code, password } = value
    // 邮箱是否注册
    const flag = await registerService.checkUserEmailExists(email)

    if (flag) return response.error(ctx, '邮箱已经注册过了,请找回密码或者直接登录!')

    /**注册记录 */
    const registRecord = await registerService.checkExpire(email)
    if (!registRecord) return response.error(ctx, '请发送验证码')

    const { regist_code, regist_code_time } = registRecord
    const seconds = dayjs(new Date()).diff(regist_code_time, 'second')
    if (seconds > +expireTime) return response.error(ctx, '验证码已过期')
    if (regist_code != code) return response.error(ctx, '验证码错误')

    return response.success(ctx, await registerService.regist(value))
  }
}
