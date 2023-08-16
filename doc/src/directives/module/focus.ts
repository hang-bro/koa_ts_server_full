/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-08-03 11:36:01
 */
import type { Directive, DirectiveBinding } from 'vue'
const directive: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // element-plus需要去找到输入框 再去绑定事件
    let input = el.getElementsByTagName('input')[0]
    input ? input.focus() : el.focus()
  }
}
export default directive
