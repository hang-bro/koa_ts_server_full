/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-26 14:31:21
 */

import crypto from 'crypto'
import axios from 'axios'

class translateService {
  /**
   *
   * @param query 翻译字段
   * @param isDev 是否开发
   * @param to 翻译==>语言
   * @returns
   */
  async requestTranslate(query: string, isDev: boolean, to = 'jp') {
    return new Promise(resolve => {
      const salt = Math.random()
      const md5 = crypto.createHash('md5')
      const apiUrl = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
      const appid = '20230601001696657'
      const secret = 'ZRvZqtwyvmkQFC5dQ3xl'
      const sign = md5.update(appid + query + salt + secret).digest('hex')
      const params = {
        q: query,
        from: 'zh',
        to,
        salt,
        appid,
        sign
      }

      if (!isDev) {
        axios
          .get(apiUrl, {
            params,
            timeout: 60000
          })
          .then(res => {
            setTimeout(() => {
              resolve(res.data.trans_result)
            }, 1000)
          })
      } else {
        resolve([{ src: query, dst: query }])
      }
    })
  }
}
export default new translateService()
