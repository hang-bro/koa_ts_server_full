
  import { IQuery } from '@/utils/useQuery'
  import prisma from "@/utils/prismaClient"
  import { dbLogger } from '@/logger'

  class email_send_hisService {
    /**查询 */
    async getList(data: IQuery) {
      const { page, query } = data
      try {
        const data = await prisma.email_send_his.findMany({ ...page, ...query })
  
        const total = await prisma.email_send_his.count(query)
  
        return { data, total }
      } catch (error) {
        console.log('error.message ==>', error.message)
        dbLogger.error(error.message)
      }
    }
  
  }
  export default  new email_send_hisService()
  