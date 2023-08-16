import { MsgType } from '@/enum/chat'
import { IncomingMessage, Server, ServerResponse } from 'http'
import { Server as socketIo } from 'socket.io'
export let userList = []
export let roomList = {}

/**根据用户id 获取实时用户详情 */
function getUserInfoById(userId: string) {
  const index = userList.findIndex(i => i.userId == userId)
  return userList[index]
}

export default (server: Server<typeof IncomingMessage, typeof ServerResponse>) => {
  const io = new socketIo(server, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', socket => {
    console.log(` 连接==>`, socket.id)

    /**
     * 退出（内置事件）
     */
    socket.on('disconnect', () => {
      console.log(`有人离线了`)
      const index = userList.findIndex(i => i.socketId == socket.id)
      /**
       * 有人退出群聊提示消息
       */
      // if (index != -1) {
      //   io.emit(MsgType.SOME_ONE_EXIT_GROUP_TIP, {
      //     ...userList[index],
      //     msgType: MsgType.SOME_ONE_EXIT_GROUP_TIP
      //   })
      //   userList = userList.filter(item => item.socketId != socket.id)
      // }
    })

    socket.on('message', (type, data) => {
      console.log(`接收消息`, JSON.stringify({ type, data }))

      switch (type) {
        /**
         * 用户登录
         */
        case MsgType.USER_LOGIN:
          /**
           * 判断内存中是否有这个用户，有则替换，没有则添加
           */
          const index = userList.findIndex(i => i.userId == data.userId)
          if (index > -1) {
            userList[index] = data
            console.log(data.username, '更新了socketId')
          } else {
            console.log(data.username, '登录系统')
            userList.push(data)
          }
          break
        /**
         * 创建群聊
         */
        case MsgType.CREATE_GROUP_CHAT:
          roomList[data.roomId] = data
          socket.join(data.roomId)
          /**
           * 给发送这条消息的人发送消息发送成功
           */
          const { socketId } = getUserInfoById(data.masterId)
          io.to(socketId).emit(MsgType.CREATE_GROUP_CHAT_SUCCESS, data)
          // console.log(`roomList ==>`, roomList)
          /**
           *  除了创建者,向其他成员发送创建群组的消息
           */
          data.members.forEach((userId: string) => {
            const user = getUserInfoById(userId)

            if (socketId != user.socketId) {
              io.to(user.socketId).emit(MsgType.CREATE_GROUP_CHAT, data)
            }
          })

          break
        /**
         * 发送群聊消息
         */
        case MsgType.SEND_GROUP_MSG:
          /**
           * 给除了发送消息的用户之外的人发送消息
           */
          socket.broadcast.emit(MsgType.SEND_GROUP_MSG, data)
          /**
           * 给发送这条消息的人发送消息发送成功
           */
          io.to(data.socketId).emit(MsgType.SEND_GROUP_MSG_SUCCESS, data.messageId)
          break
        /**
         * 获取当前连接的客户端数量
         */
        case MsgType.GET_SERVER_CONNECT_NUM:
          io.emit(MsgType.GET_SERVER_CONNECT_NUM, io.engine.clientsCount)
          break
        /**
         * 有人加入群聊
         */
        case MsgType.SOME_ONE_JOIN_GROUP:
          console.log(`userList ==>`, userList)
          let flag = false
          userList.map(item => {
            if (item.userId == data.userId) flag = true
            return
          })
          if (!flag) {
            console.log(`user ==>`, data)
            userList.push(data)
            console.log(data.username, '加入聊天')
            /**
             * 给除了发送消息的用户之外的人发送消息
             */
            socket.broadcast.emit(MsgType.SOME_ONE_JOIN_GROUP_TIP, {
              ...data,
              msgType: MsgType.SOME_ONE_JOIN_GROUP_TIP
            })
          }

        default:
          break
      }
    })
  })
}
