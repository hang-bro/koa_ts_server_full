import joi from 'joi'

const validator = {
  password: (rule: any, value: any, callback: Function) => {
    /**
     *  校验规则
     */
    const { error } = joi.string().min(6).max(20).error(new Error('密码长度应在6~20')).validate(value)

    if (error) return callback(new Error(error.message))

    return callback()
  },

  email: (rule: any, value: any, callback: Function) => {
    /**
     *  校验规则
     */
    const { error } = joi
      .string()
      .email({ tlds: { allow: false } })
      .error(new Error('邮箱不符合规范'))
      .validate(value)

    if (error) return callback(new Error(error.message))

    return callback()
  },
}

/**表单校验规则 */
const useValidate = {
  /**
   * 请输入
   */
  pleaseInput: [{ required: true, message: '请输入', trigger: 'blur' }],
  /**
   * 请选择
   */
  pleaseSelect: [{ required: true, message: '请选择', trigger: 'blur' }],
  /**
   * 密码
   */
  password: [{ validator: validator.password, required: true, trigger: 'blur' }],
  /**
   * 邮箱
   */
  email: [{ validator: validator.email, required: true, trigger: 'blur' }],
}

export default useValidate
