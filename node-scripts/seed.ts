import { getLocalIp } from '../server/utils/getIp'
/*
 * @Description:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-07 15:04:35
 */

import { Random } from 'mockjs'
import dayjs from '../server/utils/dayjs'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { readdirSync } from 'fs'
import { encrypt } from '../server/utils/crypto'

const prisma = new PrismaClient()

const avatarPath = path.join(__dirname, './app/public/avatar')

const avatarArr = readdirSync(avatarPath)
const getRandomAvatar = () => {
  const avatar = avatarArr[Math.floor(Math.random() * avatarArr.length)]
  return `https://${getLocalIp()[0]}:2333/avatar/${avatar}`
}

export async function createData() {
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        email: Random.email(Math.random() > 0.5 ? 'qq.com' : 'google.com'),
        username: Random.cname(),
        avatar: getRandomAvatar(),
        address: Random.city(),
        password: encrypt(Random.string(10))
      }
    })
  }
}

export async function deleteAll(allUsers: any) {
  allUsers.map(async (item: any) => {
    await prisma.user.delete({ where: { id: item.id } })
  })
}
async function main() {
  await createData()
  const allUsers = await prisma.user.findMany()
  // await deleteAll(allUsers)

  allUsers.map(item => {
    const fromNow = dayjs(item.createdAt).fromNow()
    console.log(`注册于 ==>`, fromNow)
  })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
