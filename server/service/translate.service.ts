/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-26 14:31:21
 */

import crypto from 'crypto';
import axios from 'axios';

class translateService {
  /** */
  async requestTranslate(query: string) {
    return new Promise((resolve) => {
      const salt = Math.random();
      const md5 = crypto.createHash('md5')
      const apiUrl = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
      const appid = '20200211000382774'
      const secret = 'b1imCNk_EdXIHM0zX2bD'
      const sign = md5.update(appid + query + salt + secret).digest('hex')
      const params = {
        q:query,
        from: 'zh',
        to: 'jp',
        salt,
        appid,
        sign,
      };
      axios.get(apiUrl, {
        params,
        timeout: 60000,
      }).then(res => {
        setTimeout(() => {
          resolve(res.data.trans_result)
        }, 1000);
      })

    })

  }
}
export default new translateService()
