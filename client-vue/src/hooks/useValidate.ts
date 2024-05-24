import Joi from 'joi'

export const defineValidator = (
  cb: (joi: typeof Joi) => any,
  trigger: 'blur' | 'change' | ['blur', 'change'] = ['blur', 'change'],
  required: boolean = true,
) => {
  return [
    {
      validator: (_rule: any, value: any, callback: Function) => {
        const { error } = cb(Joi).validate(value)

        if (error) return callback(new Error(error.message))

        return callback()
      },
      required,
      trigger,
    },
  ]
}

/**表单校验规则 */
const useValidate = {
  /**
   * 请输入
   */
  pleaseInput: defineValidator((joi) => {
    return joi.alternatives().try(joi.string(), joi.number()).error(new Error('请输入'))
  }),
  /**
   * 请选择
   */
  pleaseSelect: [{ required: true, trigger: 'blur', message: '请选择' }],
  /**
   * 密码  (6~20)
   */
  password: defineValidator((joi) => {
    return joi.string().min(6).max(20).error(new Error('密码长度应在6~20'))
  }),
  /**
   * 邮箱
   */
  email: defineValidator((joi) => {
    return joi
      .string()
      .email({ tlds: { allow: false } })
      .error(new Error('邮箱不符合规范'))
  }),
}

export default useValidate
