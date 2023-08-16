/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-14 14:50:48
 */
import dotenv from 'dotenv'
import { Configuration } from 'log4js'
import path from 'path'

dotenv.config({ path: path.join(__dirname, '../.env') }) //读取.env文件

const logPath = path.join(__dirname, '../')
const config = {
  /**http类型  http|https:// */
  httpType: process.env.HTTP_TYPE,
  wx: {
    /**微信小程序 id */
    appid: process.env.WX_APP_ID,
    /**微信小程序 secret */
    secret: process.env.WX_SECRET
  },
  /**jsonwebtoken相关 */
  jwt: {
    // 私钥
    jwt_secret: process.env.JWT_SECRET,
    // 过期时间
    jwt_expire: process.env.JWT_EXPIRE
  },
  /**服务器相关 */
  server: {
    port: process.env.SERVER_PORT
  },
  /** 数据库相关 */
  db: {
    db_host: process.env.DB_HOSTNAME,
    db_name: process.env.DB_NAME as string,
    db_username: process.env.DB_USERNAME as string,
    db_password: process.env.DB_PASSWORD as string,
    db_port: Number(process.env.DB_PORT) || 3306
  },
  /**日志 */
  log: {
    appenders: {
      cheese: { type: 'file', filename: `${logPath}/logs/cheese.log` },
      // 访问日志
      access: { type: 'file', filename: `${logPath}/logs/access.log` },
      // 数据库操作日志
      db: { type: 'file', filename: `${logPath}/logs/db.log` },
      /**发送邮件日志 */
      sendMail: { type: 'file', filename: `${logPath}/logs/sendMail.log` },
      /**上传文件 */
      upload: { type: 'file', filename: `${logPath}/logs/upload.log` },
      /**服务器错误 */
      server: { type: 'file', filename: `${logPath}/logs/server.log` },
      /**ffmpeg错误 */
      ffmpeg: { type: 'file', filename: `${logPath}/logs/ffmpeg.log` }
    },
    // 日志分类
    categories: {
      default: { appenders: ['cheese'], level: 'info' }, // level 日志级别
      access: { appenders: ['access'], level: 'info' },
      db: { appenders: ['db'], level: 'info' },
      sendMail: { appenders: ['sendMail'], level: 'info' },
      upload: { appenders: ['upload'], level: 'info' },
      server: { appenders: ['server'], level: 'warn' },
      ffmpeg: { appenders: ['ffmpeg'], level: 'warn' }
    }
  } as Configuration,
  /**nodemailer 配置信息 */
  nodemailer: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  /**文件访问地址 */
  getFilePath: {
    baseUrl: process.env.UPLOAD_BASE_URL,
    singerWorks: process.env.SINGER_WORKS_BASE_URL
  },
  koa_session: {
    app_key: process.env.APP_KEY as string,
    config: {
      key: 'koa:sess', //cookie key (default is koa:sess)
      maxAge: Number(process.env.EXPIRE_TIME) || 60000, // cookie 的过期时间 60000ms => 60s => 1min 默认是一天
      overwrite: true, //是否可以 overwrite (默认 default true)
      httpOnly: true, //cookie 是否只有服务器端可以访问 httpOnly or not (default true)
      signed: true, //签名默认 true
      rolling: false, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
      renew: false //(boolean) renew session when session is nearly expired,
    }
  },
  /**验证码失效时间 */
  authCodeExpireTime: process.env.EXPIRE_TIME,
  /**密码加密私钥 */
  pwdSecretKey: process.env.PWD_SECRET_KEY,
  /**邮箱验证码过期时间 */
  EMAIL_AUTH_CODE_EXPIRE: process.env.EMAIL_AUTH_CODE_EXPIRE,
  /**前端项目端口号 */
  FRONT_PORT: process.env.FRONT_PORT
}
export default config
