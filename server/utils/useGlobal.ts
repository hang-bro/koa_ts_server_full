import prisma from '@/utils/prismaClient'

globalThis.$prisma = prisma
globalThis.myGlobal = 'myGlobal'
