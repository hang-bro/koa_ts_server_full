<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 10:16:15
-->
<template>
  <main class="w-full h-full">
    <CURD ref="CURDRef" :api="API">
      <template #search="{ query,getList }">
        <el-form-item>
          <el-input style="width: 200px" @keyup.enter="getList" placeholder="title" v-model="query.title" clearable />
        </el-form-item>
      </template>
      <template #buttons="{ tableCheck, handleDelete }">
        <el-button plain type="primary" @click="handleAdd">新增</el-button>
        <el-button plain type="danger" :disabled="tableCheck.length == 0" @click="handleDelete()">删 除</el-button>
      </template>
      <template #table="{ handleDelete }">
        <el-table-column type="index" align="center" label="序号" width="70" />
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column show-overflow-tooltip align="center" prop="name" label="角色名称" />
        <el-table-column show-overflow-tooltip align="center" prop="key" label="角色字符">
          <template #default="{ row }">
            <el-link type="primary" :underline="false">{{ row.key }}</el-link>
          </template>
        </el-table-column>

        <el-table-column show-overflow-tooltip align="center" prop="sort" label="排序" />
        <el-table-column show-overflow-tooltip align="center" prop="remark" label="remark" />
        <el-table-column show-overflow-tooltip align="center" label="创建时间">
          <template #default="{ row }">
            {{ dayjs(row.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="150">
          <template #default="{ row }">
            <el-button @click="handleDelete(row.id)" link type="danger">删除</el-button>
            <el-button @click="handleEdit(row)" link type="warning">编辑</el-button>
          </template>
        </el-table-column>
      </template>
    </CURD>
    <el-dialog v-model="dialogVisible" :title="state.showName" width="500" draggable>
      <el-form ref="formRef" :model="form" status-icon :rules="rules" label-width="100px" class="demo-form">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色字符" prop="key">
          <el-input v-model="form.key" autocomplete="off" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" :min="0" :precision="0" controls-position="right" />
        </el-form-item>

        <el-form-item label="remark" prop="remark">
          <el-input v-model="form.remark" type="textarea" :rows="4" autocomplete="off" />
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
import CURD from '@/components/CURD/index.vue'
import { http } from '@/http'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, UploadUserFile } from 'element-plus'

interface IRole {
  id?: string
  name: string
  key: string
  sort: number
  remark: string
}

const API = ref('/api/role')

const formRef = ref<FormInstance>()

const dialogVisible = ref(false)

const CURDRef = ref()

const form = reactive<IRole>({
  name: '',
  key: '',
  sort: 0,
  remark: '',
})

const rules = reactive({
  name: [{ required: true, trigger: 'blur' }],
  key: [{ required: true, trigger: 'blur' }],
  sort: [{ required: true, trigger: 'blur' }],
})

interface IState {
  showName: 'add' | 'edit' | ''
}

const state = reactive<IState>({
  showName: '',
})

const getList = () => CURDRef.value?.getList()

const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      const data = JSON.parse(JSON.stringify(form))
      console.log(`data ==>`, data)

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

const handleAdd = () => {
  state.showName = 'add'
  dialogVisible.value = true
  resetForm()
}

const resetForm = () => {
  Object.keys(form).forEach((key) => (form[key] = ''))
  form.sort = 0
}

const handleEdit = (row: IRole) => {
  Object.keys(row).forEach((key) => (form[key] = row[key]))
  state.showName = 'edit'
  dialogVisible.value = true
}
</script>
<style lang="scss" scoped></style>
