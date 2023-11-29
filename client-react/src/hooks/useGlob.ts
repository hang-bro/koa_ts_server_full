/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-28 17:55:03
 */
/** */
export const useViteGlob = () => {
  const scss = import.meta.glob('@/views/css/**/*.scss', { eager: true, as: 'raw' })
  const arr = []
  for (const item in scss) {
    const name = item.split('/').slice(0, -1).pop() as string
    const value = scss[item]
    arr.push({ [name]: value })
  }
  return arr
}