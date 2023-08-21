/**
 * @description 生成随机渐变色
 * @returns ackground-image:linear-gradient(***)
 * @use <div :style="useRandomBg()"></div>
 */
export const useRandomBg = () => {
  function getRandomGradient() {
    // 生成随机颜色
    let color1 = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
    let color2 = `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

    // 生成随机角度
    let angle = Math.floor(Math.random() * 360)

    // 生成随机透明度
    let transparency = () => (Math.random() * 0.7).toFixed(1)

    // 构造渐变样式
    return `background-image:linear-gradient(${angle}deg, 
  rgba(${hexToRgb(color1)}, ${transparency()}), 
  rgba(${hexToRgb(color2)}, ${transparency()}))`
  }

  // 转换hex为rgb组件
  function hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16)
    let g = parseInt(hex.slice(3, 5), 16)
    let b = parseInt(hex.slice(5, 7), 16)

    return `${r}, ${g}, ${b}`
  }

  return getRandomGradient()
}
