<template>
  <section class="w-[280px] bg-white no-scroll h-auto ml-3 hidden sm:block overflow-auto animate__animated animate__fadeInRight ">
    <div
      @click.prevent="$router.push(item.path)"
      class="hover:bg-[#ebeef5] p-3  border-b-[1px] cursor-pointer"
      v-for="(item, index) in $routes">
      <div class="flex">
        <span
          :class="{
            '!bg-red-500': index == 0,
            '!bg-red-400': index == 1,
            '!bg-red-300': index == 2,
          }"
          class="flex w-[20px] h-[20px] mr-2 bg-gray-500 items-center justify-center text-white text-sm">
          {{ index + 1 }}
        </span>
        <span class="whitespace-nowrap overflow-hidden text-ellipsis">{{ item.name }}</span>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { $routes } from '@/router'
</script>
<style lang="scss" scoped></style>
