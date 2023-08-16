/*
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-07 14:54:51
 */
import config from '../config';
import aesCrypto from "crypto-js/aes"
import utf8Encode from "crypto-js/enc-utf8"

const secretKey = config.pwdSecretKey as string

// 加密
const encrypt = (text: string) => {
  let encryptedText = aesCrypto.encrypt(utf8Encode.parse(text), secretKey).toString();
  return encryptedText
}

// 解密
const decrypt = (text: any) => {
  let decryptText = aesCrypto.decrypt(text, secretKey).toString(utf8Encode)
  // @ts-ignore
  return decryptText.toString(utf8Encode);
}


export { encrypt, decrypt }
