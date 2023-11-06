/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-11 09:17:49
 */

import 'module-alias/register'
import '@/utils/useGlobal'
import { Server } from 'http'
import https from 'https'
import http from 'http'
import path from 'path'
import fs from 'fs'
import config from '@/config/index'
import { getLocalIp } from '@/utils/getIp'
import usePlugin from './plugins'

import webSocket from '@/plugins/webSocket'

export const run = async (port: any): Promise<Server> => {
  const app = await usePlugin()

  // const options = {
  //   key: fs.readFileSync(path.join(__dirname, './ssl/cert.key')),
  //   cert: fs.readFileSync(path.join(__dirname, './ssl/cert.crt'))
  // }

  // const server = https.createServer({ ...options }, app.callback())
  const server = http.createServer({}, app.callback())

  webSocket(server)

  return server.listen(port, () => {
    console.log(`server start at:`)
    getLocalIp().map(ip => {
      console.log(`${config.httpType}${ip}:${port}`)
    })
  })
  return app.listen(port, () => {
    console.log(`server start at:`)
    getLocalIp().map(ip => {
      console.log(`${config.httpType}${ip}:${port}`)
    })
  })
}

run(config.server.port)
