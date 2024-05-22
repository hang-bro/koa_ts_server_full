<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 10:16:15
-->
<template>
  <main class="w-full h-full p-5">
    <!-- 搜索区域 -->
    <section class="p-2 pl-0 hidden sm:block" v-show="state.showSearch">
      <el-form ref="queryFormRef" :model="queryForm" inline @submit.prevent>
        <el-form-item prop="username">
          <el-input v-model="queryForm.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="queryForm.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item>
          <el-button color="#626aef" type="primary" @click="getList">查询</el-button>
          <el-button type="info" @click="resetForm(queryFormRef, getList)">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <el-table show-overflow-tooltip :data="state.tableData">
      <el-table-column type="selection" align="center" width="55" fixed="left" />
      <el-table-column type="index" align="center" label="序号" width="70" />
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
            @click="viewImg({ url: row.avatar })"
            class="cursor-pointer"
            shape="square"
            fit="cover"
            :size="40"
            :src="row.avatar"
            @error="() => true">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="email" label="邮箱" width="200">
        <template #default="{ row }">
          <span v-copy="row.email" class="cursor-pointer hover:text-primary"> {{ row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" label="注册时间" width="200">
        <template #default="{ row }">
          {{ dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="address" label="地址" />
      <el-table-column show-overflow-tooltip align="center" prop="role" label="角色">
        <template #default="{ row }">
          {{ row.role }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200" fixed="right">
        <template #default="{ row }">
          <!-- <el-button @click="handleDelete(row.id)" link type="danger">删除</el-button> -->
          <el-button @click="handleEdit(row)" link type="warning">编辑</el-button>
          <el-popconfirm icon-color="#626AEF" title="确认重置密码?" @confirm="resetPwd(row.id)">
            <template #reference>
              <el-button link type="success">重置密码</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页区域 -->
    <section class="flex my-5 justify-end">
      <el-pagination
        background
        v-model:current-page="queryForm.pageIndex"
        v-model:page-size="queryForm.pageSize"
        layout="total,prev, pager, next,sizes,"
        :page-sizes="[10, 20, 40, 80, 100]"
        :total="state.total" />
    </section>
    <!-- 分页区域 end -->

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
          <el-input type="number" v-model="form.age" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select style="width: 100%" v-model="form.role" placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.key" />
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
import useValidate from '@/hooks/useValidate'
import viewImg from '@/components/ViewImg/index'
import { http } from '@/http'
import type { FormInstance, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'

interface IState {
  showName: 'add' | 'edit' | ''
  uploadUrl: string
  fileList: UploadUserFile[]
}

const uploadRef = ref()

const queryFormRef = ref()

const roleList = ref([])

const formRef = ref<FormInstance>()

const dialogVisible = ref(false)

const queryForm = reactive<IQueryParams<{ email: string; username: string }>>({
  pageIndex: 1,
  pageSize: 10,
  email: null,
  username: null,
})

const state = reactive<ICommonState<IUser> & IState>({
  api: '/user',
  tableCheck: [],
  tableData: [],
  total: 0,
  showSearch: true,

  showName: '',
  uploadUrl: import.meta.env.VITE_BASE_URL + '/api/upload',
  fileList: [],
})

const getList = () =>
  http
    .get<IPage<IUser>>(`${state.api}/list`, queryForm) /** */
    .then((res) => {
      const { rows, total } = res.data
      state.tableData = rows
      state.total = total
    })

onMounted(getList)

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
  role: useValidate.pleaseSelect,
})

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const data = JSON.parse(JSON.stringify(form))

      // 新增
      if (state.showName == 'add') {
        http.post(state.api, data).then((res) => {
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
        http.patch(`${state.api}/${form.id}`, data).then((res) => {
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

const getRoleList = () => http.get('/role').then((res) => (roleList.value = res.data.data))

const resetPwd = (userId: string) => {
  http.post(state.api + '/resetPwd', { userId }).then((res) => {
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
  getRoleList()
}

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
