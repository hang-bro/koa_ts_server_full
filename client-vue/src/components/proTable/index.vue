<template>
  <main class="w-full h-full p-5 flex flex-col bg-gray-100" ref="mainRef">
    <!-- 搜索区域 -->
    <section class="hidden sm:block my-2" v-show="showSearch">
      <SearchForm :searchForm="searchForm" :getList="getList" :reset="reset" />
    </section>
    <!-- 搜索区域 end-->
    <el-card shadow="never" class="flex-1 overflow-auto table-content">
      <!-- 按钮区域 -->
      <section class="mb-3 hidden sm:block">
        <div class="flex items-center justify-between">
          <section>
            <slot
              name="actions"
              :getList="getList"
              :handleDelete="handleDelete"
              :tableCheck="tableCheck"
              :tableCheckDisabled="tableCheckDisabled"
            />
          </section>
          <!--  -->
          <ToolBar v-model:showSearch="showSearch" :getList="getList" />
        </div>
      </section>
      <!-- 按钮区域 end -->
      <!-- 表格区域 -->
      <section class="flex-1">
        <el-table
          show-overflow-tooltip
          v-loading="loading"
          @selection-change="(rows:any[]) => (tableCheck = rows)"
          stripe
          :data="list"
          border
          style="width: 100%; height: 100%"
        >
          <template v-if="columns" v-for="column in columns">
            <el-table-column
              show-overflow-tooltip
              align="center"
              v-bind="column"
              v-if="column.type == 'expand'"
            >
              <template #default="props: ITableColumnDefaultSlotProps">
                <!-- 
              使用示例
              <template #expand="{row}">
                <div>{{row}}</div>
              </template>  
             -->
                <slot name="expand" v-bind="{ ...props }" />
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              align="center"
              v-bind="column"
              v-if="column.type == 'index'"
            />
            <el-table-column
              show-overflow-tooltip
              align="center"
              v-bind="column"
              v-if="column.type == 'selection'"
            />

            <el-table-column
              show-overflow-tooltip
              align="center"
              v-bind="column"
              v-if="!column.type || column.type == 'default'"
            >
              <template #default="props: ITableColumnDefaultSlotProps">
                <!-- 使用插槽  -->
                <slot
                  v-if="column.useSlot"
                  :name="column.prop"
                  v-bind="{ ...props }"
                  :handleDelete="handleDelete"
                />
                <!-- 使用render函数 -->
                <div v-else-if="column.render" v-html="column.render(props)"></div>
                <!-- 默认渲染方式 -->
                <div v-else>
                  {{ props.row[column.prop] || '' }}
                </div>

                <!-- 使用复制内容 -->
                <div
                  v-if="column.useCopy && props.row[column.prop]"
                  class="ml-1 w-[14px] text-[#1677ff] cursor-pointer"
                >
                  <DocumentCopy size="17" @click="useCopy(props.row[column.prop])" />
                </div>
              </template>
            </el-table-column>
          </template>
          <slot v-else name="table" />
        </el-table>
      </section>
      <!-- 表格区域 end -->
    </el-card>

    <!-- 分页区域 -->
    <section class="flex my-5 justify-end">
      <el-pagination
        background
        v-model:current-page="pageIndex"
        v-model:page-size="pageSize"
        layout="total,prev, pager, next,sizes,"
        :page-sizes="[10, 20, 40, 80, 100]"
        :total="total"
      />
    </section>
    <!-- 分页区域 end -->
  </main>
</template>
<script lang="ts" setup>
import useList from '@/hooks/useList'
import { http } from '@/http'
import { DocumentCopy } from '@element-plus/icons-vue'
import type { ElTableColumn } from 'element-plus'
import useCopy from '@/hooks/useCopy'

import { ElMessage, ElMessageBox } from 'element-plus'
import SearchForm from './components/searchForm.vue'
import ToolBar from './components/toolBar.vue'
export type IProTableProps = {
  api: string
  columns?: IProTableColumns
  searchForm?: IProTableSearchForm
  showLabel?: boolean
  searchFormSize?: IProTableSearchFormSize
}

const props = withDefaults(defineProps<IProTableProps>(), {
  searchFormSize: () => 'default',
  showLabel: () => false,
  searchForm: () => ({}),
})

const { list, total, loading, pageIndex, pageSize, tableCheck, reset, getList } = useList(
  props.api,
  props.searchForm,
)

/**是否显示搜索 */
const showSearch = ref(true)

const tableCheckDisabled = computed(() => tableCheck.value.length == 0)

await getList()

defineExpose({
  getList,
})

onMounted(() => {})

const handleDelete = (id?: string) => {
  const ids = id || tableCheck.value.map((i) => i.id)

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
.table-content {
  :deep(.el-card__body) {
    @apply h-full flex flex-col;
  }
}
</style>
