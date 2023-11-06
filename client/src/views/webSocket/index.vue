<template>
  <main class="w-full h-full flex-col 
  
   flex items-center justify-center">
    <div v-loading="loading"
      class="w-4/5 min-w-[500px] max-w-5xl h-4/5 overflow-hidden rounded-2xl shadow-xl border-[1px] chat-box">
      <div class="chat-box-header">交流群({{ userNum }})</div>
      <div class="chat-box-main">
        <!-- 成员列表 -->
        <div class="member-list">
          <div class="p-2 text-center text-sm text-gray-600/60 font-bold">在线用户</div>
          <div class="member  opacity-0" v-for="item in state.onlineUserList">
            <div class="member-avatar">
              <img :src="item.avatar" lazy />
            </div>
            <div class="member-content">
              <div class="member-content-head">
                <div class="username" :title="item.username">{{ item.username }}</div>
                <div class="time ">{{ dayjs(item.sendTime).format('HH:mm') }}</div>
              </div>
              <div class="member-content-foot">已支付￥6.00</div>
            </div>
          </div>
        </div>
        <!-- 消息列表 -->
        <div class="message-list scroll-smooth" ref="msgListRef">
          <template v-for="(item, index) in state.messageList">
            <div v-if="item.msgType == MsgType.SOME_ONE_JOIN_GROUP_TIP" class="text-center text-success my-2 text-sm">
              <span>{{ item.username }} </span> <span class="text-gray-500/50">加入聊天</span>
            </div>
            <div v-else-if="item.msgType == MsgType.SOME_ONE_EXIT_GROUP_TIP" class="text-center text-error my-2 text-sm">
              <span>{{ item.username }} </span> <span class="text-gray-500/50">退出聊天</span>
            </div>
            <div v-else class="message-list-item" :class="{ self: item.userId == userInfo.userId }">
              <div class="avatar">
                <el-image :src="item.avatar" lazy />
              </div>
              <div class="main-content">
                <div class="text-gray-500 text-xs">{{ item.username }} {{ item.sendTime }}</div>
                <div class="chat-bubble">
                  <div class="chat-bubble-box">{{ item.message }}</div>
                </div>
                <div class="text-gray-500 text-sm" v-if="item.userId == userInfo.userId">
                  <el-icon :size="16" class="is-loading" v-if="!item.isSend">
                    <Loading />
                  </el-icon>
                  <el-icon v-else :size="16">
                    <CircleCheck color="#67C23A" />
                  </el-icon>
                </div>
              </div>
            </div>
          </template>
        </div>
        <!-- 输入框 -->
        <div class="chat-input">
          <el-input v-model="state.message" @keyup.enter="sendMessage" placeholder="Please input">
            <template #append>
              <el-button @click="sendMessage">发送</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="flex f">
      <el-button @click="disconnect">断开</el-button>
      <el-button @click="connect">重连</el-button>
      <el-button @click="getRoomList">查询房间号</el-button>
      <el-button @click="; (state.showCreateGroup = true), getOnlineUserList()">创建群聊</el-button>
      <el-button @click="joinGroup">加入群聊</el-button>
    </div>
    <el-dialog v-model="state.showCreateGroup" title="创建群聊" width="500" draggable>
      <el-form ref="formRef" :model="createGroupForm" status-icon :rules="rules" label-width="auto" class="demo-form">
        <el-form-item label="名称" prop="roomName">
          <el-input v-model="createGroupForm.roomName" autocomplete="off" />
        </el-form-item>
        <el-form-item label="头像">
          <el-upload :headers="{
            ['authorization']: token,
          }" list-type="picture-card" :on-success="(e) => (createGroupForm.roomAvatar = e.data)"
            :action="state.uploadUrl" :limit="1" accept="image/*">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
        <!-- 成员 -->
        <el-select style="width: 100%" v-model="createGroupForm.members" multiple placeholder="成员">
          <el-option v-for="item in state.onlineUserList" :key="item.userId" :label="item.username"
            :value="item.userId" />
        </el-select>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="state.showCreateGroup = false">取消</el-button>
          <el-button type="primary" @click="createGroup"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>
<script lang="ts" setup>
import userStore from '@/store/user'
import { nanoid } from 'nanoid'
import { ElMessage, FormInstance } from 'element-plus'
import { Loading, CircleCheck, Plus } from '@element-plus/icons-vue'
import { SocketIo } from './socket'
import { http } from '@/http'
import { MsgType } from '@@/enum/chat'
import useValidate from '@/hooks/useValidate'
export type IMessage = {
  msgType?: string
  userId: string
  avatar: string
  username: string
  message: string
  /**发送时间 */
  sendTime: string
  /**是否发送成功*/
  isSend?: boolean
  socketId?: string
  messageId: string
}
const { username, avatar, id, token } = userStore()
const msgListRef = ref()
const formRef = ref<FormInstance>()
const loading = ref(false)

const getRoomList = () => {
  http.get<any>('/api/chat/roomList').then((res) => {
    console.log(`res.data ==>`, res.data)
  })
}
const callback = (type: string, data: any) => {
  switch (type) {
    /**用户登录 */
    case MsgType.USER_LOGIN:
      socket.send(MsgType.USER_LOGIN, { ...userInfo, socketId: socket.socketId })
      break

    /**创建群聊 */
    case MsgType.CREATE_GROUP_CHAT:
      console.log(`创建群聊  ==>`,data);
      break

    /**创建群聊成功提示 */
    case MsgType.CREATE_GROUP_CHAT_SUCCESS:
      state.showCreateGroup = false
      ElMessage.success(data.roomName + '创建成功!')
      break
    /**有人加入群聊提示消息 */
    case MsgType.SOME_ONE_JOIN_GROUP_TIP:
      state.messageList.push(data)
      break

    /**有人退出群聊提示消息 */
    case MsgType.SOME_ONE_EXIT_GROUP_TIP:
      state.messageList.push(data)
      break

    /**发送群聊消息 */
    case MsgType.SEND_GROUP_MSG:
      if (data.userId !== userInfo.userId) {
        state.messageList.push(data)
        nextTick(() => scrollMsgBottom())
      }
      break

    /**发送群聊消息成功 */
    case MsgType.SEND_GROUP_MSG_SUCCESS:
      const index = state.messageList.findIndex((msg) => msg.messageId == data)
      if (index != -1) state.messageList[index].isSend = true
      break

    default:
      break
  }
}
const socket = new SocketIo(callback)

const userInfo = reactive({
  username,
  avatar,
  userId: id,
})

const createGroupForm = reactive({
  /**群主 userId */
  masterId: userInfo.userId,
  roomName: '',
  roomAvatar: '',
  members: [],
  socketId: '',
  roomId: 'room_' + nanoid(),
})

const rules = reactive<any>({
  roomName: useValidate.pleaseInput,
})

const joinGroup = () => {
  socket.send(MsgType.SOME_ONE_JOIN_GROUP, {
    ...userInfo,
    socketId: socket.socketId,
  })
}

const createGroup = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      createGroupForm.socketId = socket.socketId
      socket.send(MsgType.CREATE_GROUP_CHAT, createGroupForm)
    }
  })
}

const state = reactive({
  showCreateGroup: false,
  uploadUrl: import.meta.env.VITE_BASE_URL + '/api/upload',
  message: '',
  onlineUserList: [],
  messageList: [] as IMessage[],
})

onMounted(() => { })

/**获取在线用户列表 */
const getOnlineUserList = () => {
  http.get<any>('/api/chat/onlineUserList').then((res) => {
    console.log(`res.data ==>`, res.data)
    state.onlineUserList = res.data
  })
}

const connect = () => {
  if (socket.connected) return
  socket.connect()
}
const disconnect = () => socket.close()
const userNum = ref(0)

const sendMessage = () => {
  if (!socket.connected) return ElMessage.error('服务器已断开')
  if (state.message.trim() == '') return ElMessage.warning('请输入内容')

  const data = {
    ...userInfo,
    message: state.message,
    sendTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    messageId: nanoid(),
    socketId: socket.socketId,
    isSend: false,
  }
  socket.send(MsgType.SEND_GROUP_MSG, data)
  state.messageList.push(data)
  state.message = ''
  nextTick(() => scrollMsgBottom())
}

/**
 * 消息框滚动到顶部
 */
const scrollMsgTop = () => (msgListRef.value.scrollTop = 0)

/**
 * 消息框滚动到底部
 */
const scrollMsgBottom = () => msgListRef.value.scrollTo(0, msgListRef.value.scrollHeight)

onUnmounted(() => disconnect())
</script>
<style lang="scss" scoped>
@use './style.scss';
</style>
