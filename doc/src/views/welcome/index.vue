<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-26 13:18:23
-->
<template>
  <main class="w-screen h-screen bg-none" ref="mainRef">
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true">
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "></div>
      </div>
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div
            class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            更多页面持续更新
            <a class="font-semibold text-indigo-600"
              ><span class="absolute inset-0" aria-hidden="true"></span>查看更多
              <span aria-hidden="true">&rarr;</span></a
            >
          </div>
        </div>
        <div class="text-center">
          <span class="text-4xl font-bold tracking-tight text-gray-900" id="welcomeType"> </span>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#dashboard"
              class="rounded-md w-[200px] bg-indigo-600 opacity-90 hover:opacity-100 p-2 shadow-sm text-white font-bold text-2xl">
              Go
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import Typed from 'typed.js'
import { onMounted, onUnmounted } from 'vue'
import CanvasNest from 'canvas-nest.js'
defineProps<{ logo?: string }>()
const mainRef = ref()
let type: Typed
let cn: CanvasNest
onMounted(() => {
  // 在 element 地方使用 config 渲染效果
  cn = new CanvasNest(mainRef.value, {
    color: '255,0,0',
    count: 30,
  })
  setTimeout(() => {
    type = new Typed('#welcomeType', {
      strings: ['欢迎! 这是一个由 <span style="color:red">koa2</span> vue3 typescript prisma 项目'],
      typeSpeed: 100,
      cursorChar: '<span style="font-size:30px">|</span>',
      // showCursor: false,
      backSpeed: 0,
    })
  }, 100)
})
onUnmounted(() => {
  cn.destroy()
  type.destroy()
})
</script>

<style lang="scss" scoped></style>
