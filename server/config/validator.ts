/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-21 18:58:42
 */
import joi from 'joi'
/** */
export const validator = {
  /**邮箱 */
  email: joi.string().email().required().min(6).max(40),
  /**密码 */
  password: joi.string().required().min(6).max(20),
  /**用户名 */
  username: joi.string().optional().allow(null).max(20),
  /**地址 */
  address: joi.string().optional().allow(null).max(100)
}