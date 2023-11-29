/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-03-14 15:35:21
 */
import * as packages from '../package.json'

export class Is {
  /**yarn环境 */
  static isYarn = this.getManage('yarn')
  /**npm环境 */
  static isNpm = this.getManage('npm-cli')
  /**pnpm环境 */
  static isPnpm = this.getManage('pnpm')

  /**获取包管理器 */
  static getManage(manager: string) {
    return manager === process.env.npm_execpath.split('\\').pop().split('.')[0]
  }
}
