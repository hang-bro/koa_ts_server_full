/**
 * 消息类型枚举
 */
export enum MsgType {
  /**
   * 用户登录
   */
  USER_LOGIN = 'user-login',
  /**
   * 创建群聊
   */
  CREATE_GROUP_CHAT = 'create-group-chat',
  /**
   * 创建群聊成功提示
   */
  CREATE_GROUP_CHAT_SUCCESS = 'create-group-chat-success',
  /**
   * 发送群聊消息
   */
  SEND_GROUP_MSG = 'send-group-msg',
  /**
   * 发送群聊成功提示
   */
  SEND_GROUP_MSG_SUCCESS = 'send-group-msg-success',
  /**
   * 收到群聊消息
   */
  RECEIVE_GROUP_MSG = 'receive-group-msg',
  /**
   * 有人加入群聊
   */
  SOME_ONE_JOIN_GROUP = 'some-one-join-group',
  /**
   * 有人加入群聊提示消息
   */
  SOME_ONE_JOIN_GROUP_TIP = 'some-one-join-group-tip',
  /**
   * 有人退出群聊
   */
  SOME_ONE_EXIT_GROUP = 'some-one-exit-group',
  /**
   * 有人退出群聊提示消息
   */
  SOME_ONE_EXIT_GROUP_TIP = 'some-one-exit-group-tip',
  /**
   * 获取当前连接的客户端数量
   */
  GET_SERVER_CONNECT_NUM = 'get-server-connect-num'
}
