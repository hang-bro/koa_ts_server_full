/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-14 11:32:36
 */
// declare module 'module-alias/register'
declare module 'chalk'
// declare module 'koa-onerror'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**http类型  http|https:// */
      HTTP_TYPE: string
      /**微信小程序 id */
      WX_APP_ID: string
      /**微信小程序 secret */
      WX_SECRET: string
      /**服务器启动的端口号 */
      SERVER_PORT: string
      NODE_ENV: string
      BASE_URL: string
      /**  数据库hostname */
      DB_HOSTNAME: string
      /**  数据库名称 */
      DB_NAME: string
      /**  数据库用户名 */
      DB_USERNAME: string
      /**  数据库密码 */
      DB_PASSWORD: string
      /**  数据库端口号 */
      DB_PORT: string
      /**  jwt私钥 */
      JWT_SECRET: string
      /**  jwt 过期时间 */
      JWT_EXPIRE: string
      /**  nodemailer AUTH邮箱用户名 */
      EMAIL_USER: string
      /**  邮箱用户名 AUTH密码 */
      EMAIL_PASS: string
      /**  支持上传文件的类型 */
      /**  文件访问地址 */
      UPLOAD_BASE_URL: string
      /**  访问歌手作品地址 */
      SINGER_WORKS_BASE_URL: string
      /**  APP KEYS koa - session秘钥 */
      APP_KEY: string
      /**  cookie过期时间 5分钟 1000 * 60 * 5 */
      EXPIRE_TIME: string
      /**  邮箱验证码过期时间 */
      EMAIL_AUTH_CODE_EXPIRE: string
      /**  前端项目端口号 */
      FRONT_PORT: string
    }
  }
}

export {}
