/*
 * @Description:userStore
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-07 17:10:29
 */
import { defineStore } from 'pinia'

export type IConfigStore = ReturnType<typeof configStore>

export type IConfig = {
  theme: 'dark' | 'light'
}

const configStore = defineStore('configStore', {
  /** state==>必须是一个方法 && 返回值为对象 */
  state: () => ({ theme: 'light' } as IConfig),
  actions: {
    setTheme(theme: 'dark' | 'light') {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add(theme)
      this.theme = theme
    },
  },
  /**pinia持久化方式 */
  persist: {
    enabled: true, // 开启存储
    // **strategies: 指定存储位置以及存储的变量都有哪些,该属性可以不写，不写的话默认是存储到sessionStorage里边，默认存储state里边的所有数据**
    strategies: [{ storage: localStorage }],
  },
})
export default configStore
