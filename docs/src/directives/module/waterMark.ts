/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-08-31 11:36:54
 */
/*
  需求：给整个页面添加背景水印。

  思路：
    1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
    2、将其设置为背景图片，从而实现页面或组件水印效果
  
  使用：设置水印文案，颜色，字体大小即可
  <div v-waterMark="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
*/

import type { Directive, DirectiveBinding } from 'vue'
/**
 *
 * @param el 目标元素
 * @param text 显示文本
 * @param font 字体
 * @param textColor 字体颜色
 */
const addWaterMarker = (
  el: HTMLElement,
  text: string,
  font: string = '16px Microsoft JhengHei',
  textColor: string = 'rgba(180, 180, 180, 0.4)'
) => {
  // angle顺时针旋转的弧度。可以通过角度值计算：degree * Math.PI / 180
  const angle = (-25 * Math.PI) / 180
  // // 水印文字，父元素，字体，文字颜色
  let can: HTMLCanvasElement = document.createElement('canvas')
  can.width = 200
  can.height = 150
  can.style.display = 'none'
  let cans = can.getContext('2d') as CanvasRenderingContext2D
  cans.rotate(angle)
  cans.font = font
  cans.fillStyle = textColor
  cans.textAlign = 'center'
  cans.textBaseline = 'middle' as CanvasTextBaseline
  cans.fillText(text, can.width / 2, can.height / 2)
  el.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
  el.appendChild(can)
}
/**水印 */
const watermark: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { text, font, textColor } = binding.value
    addWaterMarker(el, text, font, textColor)
  }
}

export default watermark
