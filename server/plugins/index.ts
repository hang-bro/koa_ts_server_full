/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 11:35:55
 */
import config from '@/config/index'
import logger from 'koa-logger'
import cors from 'koa-cors'
import koaStatic from 'koa-static'
import AccessLogMiddleWare from '@/middleware/access'
import auth from '@/middleware/auth'
import session from 'koa-session'
import enforceHttps from 'koa-sslify'
import { usePath } from '@/utils/usePath'
import { serverLogger } from '@/logger'
import { Context } from 'koa'
import { registRoutes } from './registRoutes'
import Router from 'koa-router'
import Koa from 'koa'
import koaBody from 'koa-body'
import { uploadLogger } from '@/logger'

const onerror = require('koa-onerror') //import 会报错

const { publicPath, upload } = usePath()

/**使用插件 */
const usePlugin = () => {
  const isProduction = process.env.NODE_ENV === 'production'
  const app = new Koa()
  type IApp = typeof app

  // app.keys = ['some secret '] // 签名 默认
  app.keys = [config.koa_session.app_key] // 签名 默认
  /** session */
  app
    .use(session(config.koa_session.config, app))
    // 跨域
    .use(cors())
    // 打印访问信息日志
    .use(logger())
    /**资源访问 */
    .use(koaStatic(publicPath))
    // 中间件 打印访问记录到日志
    .use(AccessLogMiddleWare)
    // https
    // .use(enforceHttps())
    // 鉴权 检查token是否存在&是否过期
    .use(auth)
    .use(
      koaBody({
        // 如果不加multipart：true ctx.request.body会获取不到值
        multipart: true, //开启文件上传
        // 使用非严格模式，解析delete请求的请求体
        strict: false, //
        formidable: {
          maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，100M
          keepExtensions: true, //保存文件扩展名
          uploadDir: upload, //配置保存路径
          multiples: false, //
          // hash:'md5',
          onFileBegin: (name, file) => {
            const str = `上传时间:${new Date().toLocaleString()} 文件地址:"${file.path}" ext:[${
              file.type
            }]`
            uploadLogger.info(str)
          }
        }
      })
    )

  // error handler
  onerror(app)
  app.on('error', async (err: any, ctx: Context) => {
    // await sendMailService.send('2831308140@qq.com')
    serverLogger.warn(err)
    console.error('服务器错误', err)
  })

  return new Promise<IApp>(async (resolve, reject) => {
    await registRoutes(app, new Router())
    resolve(app)
  })
}

export default usePlugin
