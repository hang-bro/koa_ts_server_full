<template>
  <main class="w-full h-full p-5 flex flex-col" ref="mainRef">
    <!-- 搜索区域 -->
    <section class="p-2 pl-0 hidden sm:block" v-show="showSearch">
      <el-form
        :size="searchFormSize"
        ref="searchFormRef"
        :model="searchForm"
        inline
        @submit.prevent
        v-if="Object.entries(searchForm).length > 0"
      >
        <el-form-item
          v-for="(item, key) in searchForm"
          :key="key"
          :label="showLabel ? item.label : null"
          :prop="key as string"
        >
          <!-- input -->
          <el-input
            clearable
            @keyup.enter="getList"
            v-if="item.type === 'input'"
            v-bind="item.props"
            v-model="searchForm[key]['value'] as any"
            :placeholder="item.placeholder || item.label"
          />
          <!-- select -->
          <el-select
            @change="getList"
            clearable
            v-if="item.type === 'select'"
            v-model="searchForm[key]['value']"
            v-bind="item.props"
            :placeholder="item.placeholder || item.label"
          >
            <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
          <!-- date -->
          <el-date-picker
            @change="getList"
            clearable
            v-if="item.type === 'date'"
            v-model="searchForm[key]['value'] as any"
            v-bind="item.props"
            :type="item.props && item.props.type ? item.props.type : 'date'"
            :value-format="item.props && item.props.valueFormat ? item.props.valueFormat : 'YYYY-MM-DD'"
            :placeholder="item.placeholder || item.label"
          />
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
          <slot
            name="actions"
            :getList="getList"
            :handleDelete="handleDelete"
            :tableCheck="tableCheck"
            :tableCheckDisabled="tableCheckDisabled"
          />
        </section>
        <!--  -->
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
    <section class="flex-1 overflow-auto">
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
          <el-table-column show-overflow-tooltip align="center" v-bind="column" v-if="column.type == 'expand'">
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
          <el-table-column show-overflow-tooltip align="center" v-bind="column" v-if="column.type == 'index'" />
          <el-table-column show-overflow-tooltip align="center" v-bind="column" v-if="column.type == 'selection'" />

          <el-table-column
            show-overflow-tooltip
            align="center"
            v-bind="column"
            v-if="!column.type || column.type == 'default'"
          >
            <template #default="props: ITableColumnDefaultSlotProps">
              <!-- 使用插槽  -->
              <slot v-if="column.useSlot" :name="column.prop" v-bind="{ ...props }" />
              <!-- 使用render函数 -->
              <div v-else-if="column.render" v-html="column.render(props)"></div>
              <!-- 默认渲染方式 -->
              <div v-else>
                {{ props.row[column.prop] || '' }}
              </div>
            </template>
          </el-table-column>
        </template>
        <slot v-else name="table" />
      </el-table>
    </section>
    <!-- 表格区域 end -->

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
// import viewImg from '@/components/ViewImg/index'
import useList from '@/hooks/useList'
import { http } from '@/http'
import { Refresh, Search } from '@element-plus/icons-vue'
import type { ElTableColumn, FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
const searchFormRef = ref<FormInstance>()

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

const { list, total, loading, pageIndex, pageSize, tableCheck, reset, getList, showSearch } = useList(
  props.api,
  props.searchForm,
)

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
// :deep(.el-table__body) {
//   .el-table__cell {
//     padding: 4px 0;
//   }
// }
// :deep(.el-avatar) {
//   background: transparent;
// }
</style>
