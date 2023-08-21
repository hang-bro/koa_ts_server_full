/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-12-28 13:40:35
 */
/**
 * v-longpress
 * 长按指令，长按时触发事件
 */
import type { Directive, DirectiveBinding } from 'vue'

const directive: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { callback, time } = binding.value

    if (typeof callback !== 'function') {
      throw '请传入一个方法'
    }

    // 定义变量
    let timer: any = null
    // 创建计时器（ n秒后执行函数 ）
    const start = (e: any) => {
      if (e.button) {
        if (e.type === 'click' && e.button !== 0) {
          return
        }
      }
      if (timer === null) {
        timer = setTimeout(() => {
          handler(e)
        }, time || 1000)
      }
    }
    // 取消计时器
    const cancel = () => {
      if (timer !== null) {
        clearTimeout(timer)
        timer = null
      }
    }
    // 运行函数
    const handler = (e: MouseEvent | TouchEvent) => callback()
    // 添加事件监听器
    el.addEventListener('mousedown', start)
    el.addEventListener('touchstart', start)
    // 取消计时器
    el.addEventListener('click', cancel)
    el.addEventListener('mouseout', cancel)
    el.addEventListener('touchend', cancel)
    el.addEventListener('touchcancel', cancel)
  }
}

export default directive
