import { PrismaClient } from '@prisma/client'
import { Random } from 'mockjs'

const prisma = new PrismaClient()

// async function fn() {
//   for (let i = 0; i < 5; i++) {
//     await prisma.role.create({
//       data: {
//         name: Random.ctitle(),
//         key: Random.name(),
//         sort: Math.floor(Math.random() * 100)
//       }
//     })
//   }

//   console.log(` ==>`, await prisma.role.findMany())
// }

// fn()



import { assert, expect, test } from 'vitest'


test('get users',async () => {
  const users =await prisma.user.findMany()
  expect(users.length)

})

