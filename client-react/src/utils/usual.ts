/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-28 11:22:01
 */

/**检测对象是否为空 */
export const isEmptyObj = (obj: object) => obj.constructor === Object && Reflect.ownKeys(obj).length === 0

/**获取选中文本 */
export const getSelectedText = () => window.getSelection()!.toString()

/**打乱数组 */
export const shuffle = (arr: any[]) => arr.sort(() => 0.5 - Math.random())

// 获取随机布尔值
export const getRandomBoolean = () => Math.random() > 0.5

/**数组平均值 */
export const getAverage = (arr: number[]) => arr.reduce((a, b) => (a + b)) / arr.length