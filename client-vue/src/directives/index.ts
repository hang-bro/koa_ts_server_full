/*
 * @Description:指令集和
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-05-29 15:36:28
 */
import { App, Directive, Plugin } from 'vue'
/**复制内容到剪贴板 */
import copy from './module/copy'
/**千分符显示数字 */
import thousands from './module/thousands'
/**resize */
import resize from './module/resize'

/**节流 */
import debounce from './module/debounce'
/**防抖 */
import throttle from './module/throttle'
/**页面加上水印 */
import watermark from './module/waterMark'
/**鉴权 */
import auth from './module/auth'
/**input el-input 自动获取焦点 */
import focus from './module/focus'
/**长按 */
import longpress from './module/longpress'
/**draggable */
import draggable from './module/draggable'
/**touchDirection */
import touchDirection from './module/touchDirection'

/**指令列表 */
const directivesList: { [prop: string]: Directive } = {
  copy,
  draggable,
  touchDirection,
  resize,
  thousands,
  debounce,
  throttle,
  watermark,
  auth,
  focus,
  longpress,
}
/**注册指令 */
const directives: Plugin = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      // 注册自定义指令
      app.directive(key, directivesList[key])
    })
  },
}
export default directives
