<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-29 11:21:46
-->
<template>
  <main class="w-full h-full p-5">
    <div class="flex flex-wrap gap-2">
      <div
        class="flex items-center p-3 flex-col justify-evenly w-1/6 min-w-[350px] h-[170px] cursor-pointer border-black/20 border-2 border-dashed rounded-lg hover:shadow-xl hover:translate-y-[-10px] transition"
        v-for="(item, index) in devPages"
        :key="index"
        @click="open(item.url)">
        <img :src="item.icon" class="max-h-[50px]" @error="useErrorImg" />
        <div>{{ item.name }}</div>
        <div class="indent-4">{{ item.des }}</div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import useErrorImg from '@/hooks/useErrorImg'
import { devPages } from './data'
const open = (url: string) => window.open(url, '_blank')
</script>
<style lang="scss" scoped></style>
