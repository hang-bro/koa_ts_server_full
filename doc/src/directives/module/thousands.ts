/*
 * @Description:处理千分符的显示问题
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-05-24 10:54:41
 */
import { Directive, DirectiveBinding, nextTick } from 'vue'
const copy: Directive = {
  /**千分符 */
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const key = Object.keys(binding.modifiers)[0]
    // 用户选择语言
    // 处理千分位展示
    const generatingThousandthPer = (num: any) => {
      let left = num.split('.')[0]
      let right = num.split('.')[1]
      let c = left.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
      let targetStr = num.toString().indexOf('.') !== -1 ? c + '.' + right : c
      return targetStr
    }
    // 赋值
    const assignment = async (event: any, value: string, value2?: string) => {
      binding.value[key] = value
      await nextTick(() => {
        event.target.value = generatingThousandthPer(value2 || value)
      })
    }
    // 处理最后一位非法字符
    const handlerIllegalStr = (str: string) => {
      while (!/^[0-9]+.?[0-9]*/.test(str.charAt(str.length - 1))) {
        str = str.substr(0, str.length - 1)
      }
      return str
    }
    el.addEventListener('input', (event: any) => {
      let inp = (event.target.value = event.target.value.replace(/,/g, ''))
      assignment(event, inp)
    })

    // element
    const input = document.querySelector('.el-input__inner')
    if (input) {
      input.addEventListener('blur', (event: any) => {
        const val = event.target.value
        if (!val || !/^[0-9]+.?[0-9]*/.test(val)) return
        assignment(event, handlerIllegalStr(val.replace(/,/g, '')))
      })
    }
  },
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeUnmount() {},
  unmounted() {}
}

export default copy
