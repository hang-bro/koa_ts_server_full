/*
 * @Description:复制某个值至剪贴板
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-08-31 10:52:53
 */
/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import type { Directive, DirectiveBinding } from 'vue'
import { ElMessage } from 'element-plus'
interface ElType extends HTMLElement {
  copyData: string | number
  click: any
}
const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value
    el.addEventListener('click', handleClick)
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el.click)
  }
}

function handleClick(this: any) {
  try {
    navigator.clipboard.writeText(this.copyData).then(() => ElMessage.success('复制成功'))
  } catch (error) {
    const input = document.createElement('input')
    input.value = this.copyData
    document.body.appendChild(input)
    input.select()
    document.execCommand('Copy')
    document.body.removeChild(input)
    ElMessage.success('复制成功')
  }
}

export default copy
