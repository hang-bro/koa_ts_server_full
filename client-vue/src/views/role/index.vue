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
          <el-input style="width: 200px" @keyup.enter="getList" placeholder="名称" v-model="query.name" clearable />
        </el-form-item>
        <el-form-item>
          <el-input style="width: 200px" @keyup.enter="getList" placeholder="备注" v-model="query.remark" clearable />
        </el-form-item>
      </template>
      <template #buttons="{ tableCheck, handleDelete }">
        <el-button plain type="primary" @click="handleAdd">新增</el-button>
        <el-button plain type="danger" :disabled="tableCheck.length == 0" @click="handleDelete()">删 除</el-button>
      </template>
      <template #table="{ handleDelete, viewImg, errorImg }">
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column type="index" align="center" label="序号" width="70" />
        <el-table-column show-overflow-tooltip align="center" prop="id" label="id" width="170">
          <template #default="{ row }">
            <Copy :value="row.id" size="mini" />
          </template>
        </el-table-column>

        <el-table-column show-overflow-tooltip align="center" prop="name" label="名称" />
        <el-table-column show-overflow-tooltip align="center" prop="remark" label="备注" />

        <el-table-column show-overflow-tooltip align="center" label="注册时间">
          <template #default="{ row }">
            {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template #default="{ row }">
            <el-button @click="handleDelete(row.id)" link type="danger">删除</el-button>
            <el-button @click="handleEdit(row)" link type="warning">编辑</el-button>
            <el-button @click="handleSetPermission(row)" link type="warning">分配权限</el-button>
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
          <ImageUpload ref="uploadRef" @success="(e) => (form.avatar = e.data)" @remove="(e) => (form.avatar = '')" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" autocomplete="off" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input type="number" v-model.number="form.age" autocomplete="off" />
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
import useValidate from '@/hooks/useValidate'
import { http } from '@/http'
import type { FormInstance, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'
const uploadRef = ref()

const roleList = ref([])

export interface IUser {
  id: number
  username: string
  avatar: string
  email: string
  address: string
  password: string
  age: number
  sex: number
}

const API = ref('/role/list')

const formRef = ref<FormInstance>()

const dialogVisible = ref(false)

const CURDRef = ref()

const form = reactive<any>({
  age: null,
  email: '',
  username: '',
  address: '',
  avatar: '',
  password: '',
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
        http.patch(`${API.value}/${form.id}`, data).then((res) => {
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
  // http.get<any>('/api/role').then((res) => {
  //   const { code, data } = res
  //   if (code === 200) {
  //     roleList.value = data
  //   }
  // })
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

const handleSetPermission = (row: IUser) => {}
const handleEdit = (row: IUser) => {
  Object.keys(row).forEach((key) => (form[key] = row[key]))
  state.showName = 'edit'
  getRoleList()
  dialogVisible.value = true
  nextTick(() => {
    uploadRef.value.setFiles([{ url: row.avatar }])
  })
}
</script>
<style lang="scss" scoped></style>
