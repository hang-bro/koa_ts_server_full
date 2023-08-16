/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-09 09:22:06
 */
import jwt from 'jsonwebtoken'
import config from '../config'
/**加密 */
function sign(data: any) {
  return jwt.sign({ data }, config.jwt.jwt_secret as string, {
    expiresIn: config.jwt.jwt_expire
  })
}

type IVerify = {
  result: {
    data: {
      email: string
      password: string
    }
  }
  error: Error
}
/**校验 */
function verify(token: string): IVerify {
  try {
    const result = jwt.verify(token, config.jwt.jwt_secret as string) as any
    return { result, error: null }
  } catch (error) {
    return { result: null, error }
  }
}
export { sign, verify }
