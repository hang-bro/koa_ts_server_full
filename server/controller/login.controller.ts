import { validator } from '@/config/validator'
import { Get, Post, Controller, NoAuth } from '@/decorator/index'
import loginService from '@/service/login.service'
import { sign } from '@/utils/jwt'
import response from '@/utils/response'
import joi from 'joi'
import { Context } from 'koa'
import svgCaptcha from 'svg-captcha'

@Controller('/api/login')
export default class LoginController {
  @NoAuth('/api/login')
  @Post('', '登录')
  /**登录 */
  async login(ctx: Context) {
    const schema = joi.object({
      email: validator.email,
      password: validator.password,
      captcha: joi.string()
    })
    const { error, value } = schema.validate(ctx.request.body)
    if (error) return response.error(ctx, error.message)
    const { email, password } = value
    const emailExist = await loginService.checkEmailExist(email)
    if (!emailExist) return response.error(ctx, '邮箱不存在')
    const user = await loginService.login(email, password)
    if (!user) return response.error(ctx, '密码错误')
    // @ts-ignore
    delete user.password
    // @ts-ignore
    delete user.updatedAt
    // @ts-ignore
    delete user.createdAt
    const token = sign({ email, password })
    return response.success(ctx, { ...user, token })
  }

  @NoAuth('/api/login/captcha')
  @Get('/captcha')
  async captcha(ctx: Context) {
    svgCaptcha
    // 下面这行代码是随机生成验证码图片和文本并返回给客户端
    const img = svgCaptcha.createMathExpr({
      width: 150, //  宽度
      height: 45, // 高度
      size: 4, // 验证码的长度
      noise: 3, // 干扰线条的数量
      ignoreChars: '0oO1ilI' // 验证码字符中排除 0o1i 这些较难识别的
    })
    return response.success(ctx, img)
  }
}
