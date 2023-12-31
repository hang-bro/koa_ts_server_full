/*
 * @Description:使用 viewImg 图片预览功能
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-26 17:15:25
 */
import ViewImg from './index.vue'
import { createVNode, render } from 'vue'
export interface IOption {
  /**是否可以通过点击 遮罩 关闭组件 */
  closeOnClickModel: boolean
}
export type IProp = {
  /**图片地址 */
  url: string | string[]
  /**是否可以通过点击 遮罩 关闭   默认true */
  closeOnClickModel?: boolean
}
interface IMethods {
  close: () => void
  open: (data:IProp) => void
}


/**查看图片 */
const viewImg = (prop: IProp) => {
  const vNode = createVNode(ViewImg)
  render(vNode, document.body)
  const { open, close } = vNode.component?.exposed as IMethods
  open(prop)
}
export type IViewImg = typeof viewImg
export default viewImg
