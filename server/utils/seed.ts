import { getLocalIp } from '@/utils/getIp'
import { Random } from 'mockjs'
import dayjs from '@/utils/dayjs'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { readdirSync } from 'fs'
import { encrypt } from '@/utils/crypto'
import config from '@/config'

const prisma = new PrismaClient()

const getRandomAvatar = () => {
  const avatarPath = path.join(__dirname, '../public/avatar')

  const avatarArr = readdirSync(avatarPath)
  const avatar = avatarArr[Math.floor(Math.random() * avatarArr.length)]
  return `${config.httpType}${getLocalIp()[0]}:2333/avatar/${avatar}`
}

export async function createData(length:number) {
  for (let i = 0; i < length; i++) {
    await prisma.user.create({
      data: {
        email: Random.email(Math.random() > 0.5 ? 'qq.com' : 'google.com'),
        username: Random.cname(),
        avatar: getRandomAvatar(),
        address: Random.city(),
        password: encrypt('123456')
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
  await createData(100)
  const allUsers = await prisma.user.findMany()
  // await deleteAll(allUsers)

  allUsers.map(item => {
    const fromNow = dayjs(item.createdAt).fromNow()
    console.log(`注册于 ==>`, fromNow)
  })
}

// main()
//   .catch(e => {
//     throw e
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
