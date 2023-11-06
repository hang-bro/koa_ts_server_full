/*
 * @Description: 按钮/输入框 防抖指令
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-08-03 10:19:36
 */
import type { Directive, DirectiveBinding } from 'vue'
interface ElType extends HTMLElement {
  click: () => any
}
interface bindingValue {
  value: {
    callback: () => void
    delay: number
  }
}
// <el-button v-debounce="{ callback: set, delay: 1000 }">设置</el-button>    使用示例

const debounce: Directive = {
  mounted(el: ElType, binding: bindingValue) {
    let timer: any = null
    el.click = function () {
      if (timer) {
        clearInterval(timer)
      }
      timer = setTimeout(() => {
        binding.value.callback()
      }, binding.value.delay || 500)
    }
    el.addEventListener('click', el.click)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.click)
  }
}

export default debounce
