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
      <el-form ref="searchRef" :model="query" :inline="true" @submit.prevent>
        <slot name="search" :reset="reset" :query="query" :getList="getList"></slot>
        <el-form-item>
          <el-button color="#626aef" type="primary" @click="getList" :icon="Search">查询</el-button>
          <el-button type="info" @click="reset" :icon="Refresh">重置</el-button>
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
      <slot name="table" :errorImg="errorImg" :viewImg="viewImg" :handleDelete="handleDelete"></slot>
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
import viewImg from '@/components/ViewImg/index'
import useClient from '@/hooks/useClient'
import useList from '@/hooks/useList'
import { http } from '@/http'
import { Refresh, Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, UploadUserFile } from 'element-plus'

const { scrollHeight } = useClient()

const props = defineProps<{ api?: string; queryParam?: object }>()

const { list, total, loading, pageIndex, pageSize, tableCheck, query, reset, getList, showSearch } = useList<any[]>(
  props.api,
  props.queryParam,
)

await getList()

const searchRef = ref<FormInstance>()

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
