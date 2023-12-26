/*
 * @Description:  检测移动端滑动方向
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-08-03 11:36:01
 */
import type { Directive, DirectiveBinding } from 'vue'
const directive: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const state = {
      touchStartX: 0,
      touchStartY: 0,
      delta: 0,
    }
    // 触摸开始
    function touchStart(e: TouchEvent) {
      state.touchStartX = e.touches[0].clientX
      state.touchStartY = e.touches[0].clientY
    }

    // 触摸结束
    function touchEnd(e: TouchEvent) {
      const deltaX = e.changedTouches[0].clientX - state.touchStartX
      const deltaY = e.changedTouches[0].clientY - state.touchStartY
      // X轴的滑动距离大于 delta，且此次事件是以X轴移动为主（左滑或者右滑）；delta需要在data中定义
      if (Math.abs(deltaX) > state.delta && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX >= 0) {
          console.log('右滑')
          binding.value?.('right')
        } else {
          console.log('左滑')
          binding.value?.('left')
        }
        // Y轴的滑动距离大于 delta，且此次事件是以Y轴移动为主（上滑或者下滑）；
      } else if (Math.abs(deltaY) > state.delta && Math.abs(deltaX) < Math.abs(deltaY)) {
        if (deltaY < 0) {
          console.log('上滑')
          binding.value?.('top')
        } else {
          console.log('下滑')
          binding.value?.('bottom')
        }
        // 两轴位移都特别小，可以判断是点击
      } else if (Math.abs(deltaY) < 25 && Math.abs(deltaX) < 25) {
        console.log('点击')
      } else {
        console.log('可能是误触')
      }
    }
    el.addEventListener('touchend', touchEnd)
    el.addEventListener('touchstart', touchStart)
  },
}
export default directive
