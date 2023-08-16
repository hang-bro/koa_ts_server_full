/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-30 13:51:48
 */
import Joi from 'joi'
// Joi.object()的方法，接收一个对象作为参数
//  这里定义的规则可以验证一个新用户的注册表单数据
const userDateRules = Joi.object({
  nickName: Joi.string().min(6).max(16).required(),
  email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱不符合验证规则')),
  password: Joi.string().required().regex(/^[a-zA-Z0-9]{3,30}$/).error(new Error('密码不符合验证规则')),
  status: Joi.number().valid(0, 1),
  role: Joi.string().valid('normal', 'admin')
})
// 这里先准备一个被验证的数据
//  userData中的各字段名和验证规则中的字段名相同时，才会对该字段进行校验（不要求顺序）
//   比如userData中的status: 1,对应上一步中的校验规则是status: Joi.number().valid(0, 1)
const userData = {
  nickName: 'gcldsar',
  email: 'greaclar@china.cn',
  password: '123456789',
  role: 'admin2',
  avatar: null,
  createTime: new Date,
  status: 1
}

// validate方法接收两个参数
//  第一个是要被验证的数据
//  第二个参数是可选的，用来定义进行校验时的一些行为
//   如：是否允许被校验的数据中，包含没有匹配校验规则的字段，这里的userDataObj包含avatar字段而校验规则中并没有该字段
const { value, error } = userDateRules.validate(userData,)
console.log(`value ==>`, value);
console.log(`error ==>`, error.message);