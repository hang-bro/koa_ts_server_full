<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 10:16:15
-->
<template>
  <main class="w-full h-full">
    <ProTable ref="ProTableRef" :api="API" :columns="columns" :searchForm="searchForm">
      <template #actions="{ tableCheck, tableCheckDisabled, handleDelete }">
        <el-button plain type="primary" @click="handleAdd">新增</el-button>
        <el-button plain type="danger" :disabled="tableCheckDisabled" @click="handleDelete()">
          删除
        </el-button>
      </template>
      <template #option="{ row, handleDelete }">
        <el-button link type="warning" @click="handleEdit(row)">修改</el-button>
        <el-button link type="danger" @click="handleDelete(row.id)">删除</el-button>
      </template>
    </ProTable>
    <AddAndEditDialog v-model:show="addAndEditDialog.show" v-bind="addAndEditDialog" @getList="getList" />
  </main>
</template>
<script lang="ts" setup>
import AddAndEditDialog, { IProps } from './components/addAndEditDialog.vue'

const addAndEditDialog = reactive<IProps>({
  show: false,
  type: '',
  formData: {},
})

const searchForm = reactive<IProTableSearchForm>({
  name: { type: 'input', label: '名称', value: null },
  remark: { type: 'input', label: '备注', value: null },
  key: { type: 'input', label: '字符', value: null },
})

const columns = ref<IProTableColumns>([
  { type: 'selection' },
  { type: 'index', label: '序号', width: 70 },
  { prop: 'id', label: 'id' },
  {
    prop: 'key',
    label: '字符',
    render: ({ row }) => {
      return `<div>${row.key}</div>`
    },
    useCopy: true,
  },
  { prop: 'name', label: '名称' },
  { prop: 'remark', label: '备注' },
  { label: '操作', prop: 'option', useSlot: true },
])

const API = ref('/role/list')

const ProTableRef = ref<IProTable>()

const getList = () => ProTableRef.value.getList()

const handleEdit = (row: any) => {
  addAndEditDialog.type = 'edit'
  addAndEditDialog.formData = { ...row }
  addAndEditDialog.show = true
}
const handleAdd = () => {
  addAndEditDialog.type = 'add'
  addAndEditDialog.show = true
}
</script>
<style lang="scss" scoped></style>
