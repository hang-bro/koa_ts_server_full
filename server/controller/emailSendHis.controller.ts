import { Controller, Get,  } from '@/decorator/index'
import emailSendHisService from '@/service/emailSendHis.service'
import response from '@/utils/response'
import { useQuery } from '@/utils/useQuery'
import { Context } from 'koa'

@Controller('/api/emailSendHis')
export default class emailSendHisController {
  
  @Get('', '获取邮箱发送记录')
  /**获取邮箱发送记录 */
  async get(ctx: Context) {
    return response.page(ctx, await emailSendHisService.getList(useQuery(ctx)))
  }
}
