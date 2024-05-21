<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 10:16:15
-->
<template>
  <main class="w-full h-full p-5">
    <!-- 搜索区域 -->
    <section class="p-2 pl-0 hidden sm:block" v-show="showSearch">
      <el-form :size="searchFormSize ? searchFormSize : 'default'" ref="searchFormRef" :model="searchForm" inline @submit.prevent>
        <el-form-item v-for="(item, key) in searchForm" :key="key" :label="showLabel ? item.label : null" :prop="key">
          <!-- input -->
          <el-input
            clearable
            @keyup.enter="getList"
            v-if="item.type === 'input'"
            v-model="searchForm[key]['value']"
            :placeholder="item.placeholder || item.label" />
          <!-- select -->
          <el-select
            @change="getList"
            clearable
            v-if="item.type === 'select'"
            v-model="searchForm[key]['value']"
            :placeholder="item.placeholder || item.label">
            <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <!-- date -->
          <el-date-picker
            @change="getList"
            clearable
            v-if="item.type === 'date'"
            v-model="searchForm[key]['value']"
            v-bind="item.options"
            :type="item.options && item.options.type ? item.options.type : 'date'"
            :value-format="item.options && item.options.valueFormat ? item.options.valueFormat : 'YYYY-MM-DD'"
            :placeholder="item.placeholder || item.label" />
        </el-form-item>
        <el-form-item>
          <el-button color="#626aef" type="primary" @click="getList" :icon="Search">查询</el-button>
          <el-button type="info" @click="reset(searchFormRef)" :icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </section>
    <!-- 搜索区域 end-->
    <!-- 按钮区域 -->
    <section class="mb-3 hidden sm:block">
      <div class="flex items-center justify-between">
        <section>
          <slot name="buttons" :getList="getList" :handleDelete="handleDelete" :tableCheck="tableCheck"></slot>
        </section>
        <section>
          <el-tooltip placement="top">
            <template #content> {{ showSearch ? '隐藏搜索' : '显示搜索' }} </template>
            <el-button class="ml-2" @click="showSearch = !showSearch" circle :icon="Search" />
          </el-tooltip>
          <el-tooltip placement="top">
            <template #content> 刷新列表 </template>
            <el-button class="ml-2" @click="getList" circle :icon="Refresh" />
          </el-tooltip>
        </section>
      </div>
    </section>
    <!-- 按钮区域 end -->
    <!-- 表格区域 -->
    <el-table
      show-overflow-tooltip
      v-loading="loading"
      :max-height="scrollHeight - 230"
      @selection-change="(rows) => (tableCheck = rows)"
      stripe
      :data="list"
      border
      style="width: 100%">
      <slot name="table" :errorImg="errorImg" :viewImg="() => {}" :handleDelete="handleDelete"></slot>
    </el-table>
    <!-- 表格区域 end -->

    <!-- 分页区域 -->
    <section class="flex my-5 justify-end">
      <el-pagination
        background
        v-model:current-page="pageIndex"
        v-model:page-size="pageSize"
        layout="total,prev, pager, next,sizes,"
        :page-sizes="[10, 20, 40, 80, 100]"
        :total="total" />
    </section>
    <!-- 分页区域 end -->
  </main>
</template>
<script lang="ts" setup>
import errorImg from '@/assets/svg/img-error.svg'
// import viewImg from '@/components/ViewImg/index'
import useClient from '@/hooks/useClient'
import useList from '@/hooks/useList'
import { http } from '@/http'
import { Refresh, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, UploadUserFile } from 'element-plus'
import { SearchFormProps, IFormSize } from './type'

const { scrollHeight } = useClient()
type IProps = {
  api?: string
  queryParam?: object
  showLabel?: boolean
  searchFormSize?: IFormSize
}

const props = defineProps<IProps>()

const searchForm = reactive<SearchFormProps>({
  name: { type: 'input', label: '名称', value: null },
  remark: { type: 'input', label: '备注', value: null },
  select: {
    type: 'select',
    label: '选择',
    value: null,
    options: [
      {
        label: '1',
        value: 1,
      },
      {
        label: '2',
        value: 2,
      },
    ],
  },
  date: {
    type: 'date',
    label: '日期',
    options: {
      type: 'daterange',
    },
    value: [],
    formateValue: (value, form) => {
      form.startTime = value[0]
      form.endTime = value[1]
    },
  },
})

const { list, total, loading, pageIndex, pageSize, tableCheck, query, reset, getList, showSearch } = useList<any[]>(
  props.api,
  searchForm,
)

await getList()

const searchFormRef = ref<FormInstance>()

defineExpose({
  getList,
})

onMounted(() => {
  if (props.queryParam) {
    // Object.keys(props.queryParam).forEach((key) => (query[key] = props.queryParam[key]))
  }
})

const selectRowIds = computed(() => tableCheck.value.map((i) => i.id).toString())

const handleDelete = (id?: string) => {
  const ids = id || selectRowIds.value

  ElMessageBox.confirm('确定删除?', '提示', { type: 'warning' })
    .then(() => {
      http.delete(`${props.api}/${ids}`).then((res) => {
        const { code, message } = res
        if (code == 200) {
          ElMessage.success(message)
          getList()
        }
      })
    })
    .catch((e) => e)
}
</script>
<style lang="scss" scoped>
:deep(.el-table__body) {
  .el-table__cell {
    padding: 4px 0;
  }
}
:deep(.el-avatar) {
  background: transparent;
}
</style>
