import { Controller, Get } from '@/decorator/index'
import response from '@/utils/response'
import { Context } from 'koa'

import { userList, roomList } from '@/plugins/webSocket'
@Controller('/api/chat')
export default class chatController {
  @Get('/onlineUserList')
  async userlist(ctx: Context) {
    return response.success(ctx, userList)
  }

  @Get('/roomList')
  async roomList(ctx: Context) {
    return response.success(ctx, roomList)
  }
}
