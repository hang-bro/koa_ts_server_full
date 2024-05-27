<template>
  <el-card shadow="never">
    <el-form
      :size="searchFormSize"
      ref="searchFormRef"
      :model="searchForm"
      inline
      @submit.prevent
      v-if="Object.entries(searchForm).length > 0"
    >
      <section>
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
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
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
      </section>
      <section>
        <el-button color="#626aef" type="primary" @click="getList" :icon="Search">查询</el-button>
        <el-button type="info" @click="reset(searchFormRef)" :icon="Refresh">重置</el-button>
      </section>
    </el-form>
  </el-card>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { Refresh, Search } from '@element-plus/icons-vue'

const searchFormRef = ref<FormInstance>()

type IProps = {
  searchForm: IProTableSearchForm
  showLabel?: boolean
  searchFormSize?: IProTableSearchFormSize
  getList: (...args: any[]) => any
  reset: (...args: any[]) => any
}

defineProps<IProps>()
</script>
<style lang="scss" scoped>
:deep(.el-card__body) {
  @apply p-2;
  form {
    @apply flex items-end;
    .el-form-item {
      @apply mb-2 mr-3;
      &:last-child {
        @apply mb-0;
      }
    }
    section {
      &:nth-child(1) {
      }
      &:nth-child(2) {
        @apply flex-1 flex justify-end items-center;
      }
    }
  }
}
</style>
