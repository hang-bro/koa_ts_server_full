/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-13 16:39:24
 */
import { getLocalIp } from '../server/utils/getIp'
import { writeFileSync } from 'fs'
import config from '../server/config'
import path from 'path'

const docEnvPath = path.join(__dirname, '../client/.env.dev')

const ip = getLocalIp()[0]

const { httpType, server, FRONT_PORT } = config

const str = `
VITE_BASE_API=/api\n
VITE_BASE_URL=${httpType}${ip}:${server.port}\n
VITE_FRONT_PORT=${FRONT_PORT}\n
`
writeFileSync(docEnvPath, str)
