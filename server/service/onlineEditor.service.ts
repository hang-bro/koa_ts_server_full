/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 11:24:25
 */

import { generateDirTree } from '@/utils/generateTree'

import fs from 'fs'

import { usePath } from '@/utils/usePath'

const { myProject } = usePath()

class onlineEditorService {
  /** */
  async getProjectList() {
    const files = fs.readdirSync(myProject)
    return files.map(item => ({ label: item, value: `${myProject}/${item}` }))
  }

  async generateTree(path: string) {
    return generateDirTree(path)
  }

  async generateImg(path: string, type: string) {
    const content = fs.readFileSync(path)
    return `<img style="max-width: 100%;" src="data:${type};base64,${content.toString('base64')}"/>`
  }

  /**文件太大了 */
  async fileOverSize(path: string) {
    return `<h1>文件太大了!服务器顶不住了!</>`
  }
}
export default new onlineEditorService()
