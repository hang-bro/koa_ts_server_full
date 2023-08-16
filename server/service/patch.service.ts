import { getHtmlBody, downloadFile, IDownloadFile } from '@/utils/downFileByCheeriio'
import path from 'path'
import fs from 'fs'
import axios from 'axios'

class patchService {
  /**获取页面结构 */
  async getHTML(url: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const { data } = await axios.get(url, { responseType: 'text', timeout: 10000 }).catch(e => e)
      setTimeout(() => resolve(data || ''), 100)
    })
  }

  /**下载文件 */
  async download(item: IDownloadFile, dirName: string = 'hotPic') {
    return new Promise<void>(async (resolve, reject) => {
      /**保存文件位置 */
      const saveDirName = path.join(__dirname, `../public/download/${dirName}/`)

      console.log(`saveDirName ==>`, saveDirName)

      //判断文件夹是否已经存在
      if (!fs.existsSync(saveDirName)) fs.mkdirSync(saveDirName)

      const filePath = saveDirName + item.fileName
      // 判断图片是否已经存在
      if (!fs.existsSync(filePath)) {
        const stream = fs.createWriteStream(filePath)

        const { data } = await axios.get(item.url, { responseType: 'stream', timeout: 60000 })
        console.log(` ==>文件获取成功`)
        await data.pipe(stream)
        console.log(`正在下载${item.fileName}`)
        stream.on('finish', () => {
          console.log(`${item.fileName}下载完成`)
          stream.end()
          resolve()
        })
        stream.on('error', reject)
      } else {
        console.log(`${item.fileName}文件已存在`)
        resolve()
      }
    })
  }
}

export default new patchService()
