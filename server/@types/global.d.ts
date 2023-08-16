import { IPrisma } from '@/utils/prismaClient'

declare global {
  var $prisma: IPrisma
}
export {}
