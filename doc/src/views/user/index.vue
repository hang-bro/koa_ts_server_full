<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 10:16:15
-->
<template>
  <main class="w-full h-full">
    <CURD ref="CURDRef" :api="API" :queryParam="{ orderBy: 'createdAt', orderSort: 'asc' }">
      <template #search="{ query, getList }">
        <el-form-item>
          <el-input
            style="width: 200px"
            @keyup.enter="getList"
            placeholder="用户名"
            v-model="query.username"
            clearable />
        </el-form-item>
        <el-form-item>
          <el-input style="width: 200px" @keyup.enter="getList" placeholder="邮箱" v-model="query.email" clearable />
        </el-form-item>
      </template>
      <template #buttons="{ tableCheck, handleDelete }">
        <el-button plain type="primary" @click="handleAdd">新增</el-button>
        <el-button plain type="danger" :disabled="tableCheck.length == 0" @click="handleDelete()">删 除</el-button>
      </template>
      <template #table="{ handleDelete, viewImg, errorImg }">
        <el-table-column type="index" align="center" label="序号" width="70" />
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column show-overflow-tooltip align="center" prop="id" label="id">
          <template #default="{ row }">
            <!-- <span v-copy="row.id" class="cursor-pointer hover:text-primary"> {{ row.id }}</span> -->
            <Copy :value="row.id" size="mini" />
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="username" label="用户名" />
        <el-table-column show-overflow-tooltip align="center" prop="avatar" label="头像">
          <template #default="{ row }">
            <el-avatar
              class="cursor-pointer"
              shape="square"
              fit="cover"
              :size="40"
              :src="row.avatar"
              @click="viewImg({ url: row.avatar })"
              @error="() => true">
              <img :src="errorImg" />
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="email" label="邮箱">
          <template #default="{ row }">
            <span v-copy="row.email" class="cursor-pointer hover:text-primary"> {{ row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="注册时间">
          <template #default="{ row }">
            {{ dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column show-overflow-tooltip align="center" prop="address" label="地址" />
        <el-table-column show-overflow-tooltip align="center" prop="roleId" label="角色">
          <template #default="{ row }">
            <el-check-tag checked v-if="row.roles.length > 0 && row.roles[0].key == 'admin'">{{
              row.roles[0].name
            }}</el-check-tag>
            <el-check-tag class="ml-2" v-else :checked="false">{{ row?.roles[0]?.name }}</el-check-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="200">
          <template #default="{ row }">
            <el-button @click="handleDelete(row.id)" link type="danger">删除</el-button>
            <el-button @click="handleEdit(row)" link type="warning">编辑</el-button>
            <el-popconfirm icon-color="#626AEF" title="确认重置密码?" @confirm="resetPwd(row.id)">
              <template #reference>
                <el-button link type="success">重置密码</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </template>
    </CURD>
    <el-dialog v-model="dialogVisible" :title="state.showName" width="500" draggable>
      <el-form ref="formRef" :model="form" status-icon :rules="rules" label-width="auto" class="demo-form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="state.showName == 'add'" label="密码" prop="password">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <ImageUpload @success="(e) => (form.avatar = e.data)" @remove="(e) => (form.avatar = '')" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select style="width: 100%" v-model="form.roleId" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="warning" @click="resetForm">清空</el-button>
          <el-button type="primary" @click="handleSubmit"> 提交 </el-button>
        </span>
      </template>
    </el-dialog>
  </main>
</template>
<script lang="ts" setup>
import { http } from '@/http'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, UploadUserFile } from 'element-plus'
import { useStore } from '@/hooks/useStore'
import useValidate from '@/hooks/useValidate'

const fileRemove = (...e) => {
  console.log(`e ==>`, e)
}

const roleList = ref([])

interface IUser {
  id?: string
  email: string
  username: string
  address: string
  avatar: string
  roleId?: any
  password: string
}

const API = ref('/api/users')

const formRef = ref<FormInstance>()

const dialogVisible = ref(false)

const CURDRef = ref()

const form = reactive<IUser>({
  email: '',
  username: '',
  address: '',
  avatar: '',
  password: '',
  roleId: '',
})

const rules = reactive({
  username: useValidate.pleaseInput,
  address: useValidate.pleaseInput,
  avatar: useValidate.pleaseSelect,
  email: useValidate.email,
  password: useValidate.password,
  roleId: useValidate.pleaseSelect,
})

interface IState {
  showName: 'add' | 'edit' | ''
  uploadUrl: string
  fileList: UploadUserFile[]
}

const state = reactive<IState>({
  showName: '',
  uploadUrl: import.meta.env.VITE_BASE_URL + '/api/upload',
  fileList: [],
})

const getList = () => CURDRef.value?.getList()

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const data = JSON.parse(JSON.stringify(form))

      // 新增
      if (state.showName == 'add') {
        http.post(API.value, data).then((res) => {
          const { code, message } = res
          if (code === 200) {
            ElMessage.success(message)
            dialogVisible.value = false
            getList()
          }
        })
      }

      // 修改
      if (state.showName == 'edit') {
        delete data.password
        http.put(API.value, data).then((res) => {
          const { code, message } = res
          if (code === 200) {
            ElMessage.success(message)
            dialogVisible.value = false
            getList()
          }
        })
      }
    }
  })
}

const getRoleList = () => {
  http.get<any>('/api/role').then((res) => {
    const { code, data } = res
    if (code === 200) {
      roleList.value = data
    }
  })
}

const resetPwd = (userId: string) => {
  http.post(API.value + '/resetPwd', { userId }).then((res) => {
    const { code, message } = res
    if (code === 200) {
      ElMessage.success(message)
      getList()
    }
  })
}

const handleAdd = () => {
  state.showName = 'add'
  dialogVisible.value = true
  resetForm()
  getRoleList()
}

const resetForm = () => {
  state.fileList = []
  Object.keys(form).forEach((key) => (form[key] = ''))
}

const handleEdit = (row: IUser) => {
  Object.keys(row).forEach((key) => (form[key] = row[key]))
  if (row.avatar) state.fileList = [{ url: row.avatar, name: row.avatar }]
  state.showName = 'edit'
  getRoleList()
  dialogVisible.value = true
}
</script>
<style lang="scss" scoped></style>
