/*
 * @Description: resieze
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-08-03 11:36:01
 */
import type { Directive, DirectiveBinding } from 'vue'

const map = new WeakMap()

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    // 运行 entry.target 对应的回调函数
    const handler = map.get(entry.target)
    if (handler) {
      handler({
        width: entry.borderBoxSize[0].blockSize,
        height: entry.borderBoxSize[0].inlineSize,
      })
    }
  }
})

const directive: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    map.set(el, binding.value)
    // 监听元素尺寸的变化
    observer.observe(el)
  },
  unmounted(el: HTMLElement, binding: DirectiveBinding) {
    observer.unobserve(el)
    // console.log(`map ==>`, map)
  },
}
export default directive
