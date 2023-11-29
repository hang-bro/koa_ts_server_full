import { onMounted, onUnmounted } from 'vue'

/**
 * @param event    事件名称
 * @param callback 传入的回调函数
 * @param debounce 是否开启防抖
 */
const useEvent = (event: keyof WindowEventMap, callback: any, debounce: boolean = true) => {
  /**
   *
   */
  onMounted(() => {
    let timer: any = null
    window.addEventListener(event, (e) => {
      if (debounce) {
        // 添加防抖
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          callback(e)
        }, 500)
      } else {
        callback(e)
      }
    })
  })
  /**
   *
   */
  onUnmounted(() => {
    window.removeEventListener(event, callback)
  })
}

export default useEvent
