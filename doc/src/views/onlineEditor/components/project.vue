<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 09:45:32
-->
<template>
  <main class=" w-screen h-screen flex flex-col p-5  rounded-xl overflow-auto">
    <!-- 项目列表 -->
    <header class="font-bold text-2xl pl-2">项目列表</header>
    <div class=" flex flex-wrap items-center justify-between">
      <div @click="openProjecet(item.value)"
        class=" cursor-pointer flex-1 min-w-[300px] whitespace-nowrap bg-slate-200 p-10 rounded-sm m-2 flex items-center justify-center"
        v-for="(item, index) in projectList" :key="index">
        <a>{{ item.label }}</a>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { http } from '@/http';
import { useRouter } from 'vue-router';
const router = useRouter()

interface IProject {
  label: string
  value: string
}

const projectList = ref<IProject[]>([])

const { data } = await http.get<IProject[]>('/api/onlineEditor/project')
projectList.value = data


const openProjecet = (path: string) => {
  router.push({ path: '/editor', query:{path}})
}

</script>
<style lang="scss" scoped></style>
