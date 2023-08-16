<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 10:02:35
-->
<template>
  <main class=" w-screen h-screen py-3 flex-1 flex bg-white rounded-md overflow-auto overflow-x-hidden">
    <!--tree -->
    <div class="min-w-[250px] overflow-auto" v-if="data">
      <!-- @vue-ignore -->
      <el-tree :data="data" :props="{ children: 'children', label: 'name' }" accordion @node-click="handleNodeClick" />
    </div>
    <div class=" flex-1 mr-3 overflow-auto">
      <div contenteditable class=" relative p-3 bg-gray-100 overflow-auto h-full rounded-md outline-none">
        <pre v-if="html" v-html="html" />
        <div v-else class=" cursor-pointer absolute text-gray-500 left-1/2 top-1/2 trans">选择文件打开</div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import 'highlight.js/styles/atom-one-dark.css'
import { http } from '@/http';
interface Tree {
  label: string
  children?: Tree[]
  type?: 'file' | 'dir'
  key?: string
}
const data = ref<Tree[]>()
/**
 * 当前选中的文件
 */
const currentSelectFile = ref('')
const { path } = useRoute().query


if (path) {
  const res = await http.post<Tree[]>('/api/onlineEditor/projectTree', { path })
  data.value = res.data
}

const html = ref<string>('')
const fileName = ref<string>('')
const handleNodeClick = (data: Tree) => {
  if (data.type == 'file') {
    fileName.value = data.key.split('/').pop()
    if (currentSelectFile.value === data.key) return
    currentSelectFile.value = data.key
    http.post<string>('/api/onlineEditor/getFile', { path: data.key }).then(res => {
      html.value = res.data
    })
  }
}
</script>
<style lang="scss" scoped>
.trans {
  transform: translate(-50%, -50%);
}
</style>
