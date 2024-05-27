<template>
  <section>
    <el-tooltip placement="top">
      <template #content> {{ showSearch ? '隐藏搜索' : '显示搜索' }} </template>
      <el-button class="ml-2" @click="handleShowSearch" circle :icon="Search" />
    </el-tooltip>
    <el-tooltip placement="top">
      <template #content> 列设置 </template>
      <el-button class="ml-2" @click="getList" circle :icon="Operation" />
    </el-tooltip>
    <el-tooltip placement="top">
      <template #content> 刷新列表 </template>
      <el-button class="ml-2" @click="getList" circle :icon="Refresh" />
    </el-tooltip>
  </section>
</template>
<script lang="ts" setup>
import { Operation, Refresh, Search } from '@element-plus/icons-vue'

type IProps = {
  showSearch: boolean
  getList: (...args: any[]) => any
}

const props = defineProps<IProps>()

type IEmit = {
  (e: 'update:showSearch', v: boolean)
}
const emit = defineEmits<IEmit>()

const handleShowSearch = () => emit('update:showSearch', !props.showSearch)
</script>
<style lang="scss" scoped></style>
