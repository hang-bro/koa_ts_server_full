import { cloneDeep } from 'lodash-es'

/**
 * @description        从另外一个表单 设置 表单 中拥有的属性(字段)
 * @param form         表单
 * @param otherForm    另外一个表单
 */
const setExsitField = (form: object, otherForm: object) => {
  const _otherForm = cloneDeep(otherForm)
  Object.keys(form).forEach((field) => {
    if (_otherForm[field]) {
      form[field] = _otherForm[field]
    }
  })
}

export default setExsitField
