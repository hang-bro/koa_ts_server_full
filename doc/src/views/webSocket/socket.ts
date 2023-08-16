import io, { Socket } from 'socket.io-client'

import { MsgType } from '@@/enum/chat'
import { ElMessage } from 'element-plus'

export class SocketIo {
  /**
   * socket.io 实例
   */
  private instance: Socket

  /**
   * 传入的回调方法
   */
  private callback: Function

  /**
   * 连接状态 是否连接
   */
  connected: boolean = false
  /**
   * 用户列表
   */
  userList: Array<any> = []

  constructor(callback: Function) {
    this.callback = callback
    this.connect()
  }

  /**
   * 连接服务器
   */
  connect() {
    this.instance = io(import.meta.env.VITE_BASE_URL)
    this.addEventListener()
  }
  /**
   * 添加监听事件
   */
  addEventListener() {
    /**
     *  连接成功
     */
    this.instance.on('connect', () => {
      console.log(`连接成功 ==>`)
      this.connected = true
      this.callback(MsgType.USER_LOGIN)
    })

    Object.keys(MsgType).forEach((event) => {
      this.instance.on(MsgType[event], (data: any) => {
        console.log(`服务器响应==>`, { event: MsgType[event], data })
        this.callback(MsgType[event], data)
      })
    })

    // 断开连接
    this.instance.on('disconnect', (reason) => {
      console.log('断开连接-disconnect', reason)
    })
    // 错误
    this.instance.on('error', (err) => {
      console.log('错误-error', err)
    })
    // 连接错误
    this.instance.on('connect_error', (err) => {
      ElMessage.error('连接错误' + err.message)
    })
  }
  /**
   * 关闭连接
   */
  close() {
    this.instance.close()
    this.connected = false
    this.callback('关闭连接')
  }

  /**
   * @description 发送消息
   * @param msgType 消息类型
   * @param data 消息体
   */
  send(msgType: string, data?: any) {
    console.log('用户发送消息==>', JSON.parse(JSON.stringify({ msgType, data })))
    this.instance.send(msgType, data)
  }

  get socketId() {
    // console.log(`this.instance.id ==>`,this.instance.id);
    return this.instance.id
  }
}
