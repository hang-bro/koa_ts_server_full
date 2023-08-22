<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-28 20:03:56
-->
<template>
  <main class="w-screen h-screen flex flex-col overflow-hidden bg-white dark:bg-black">
    <Header />

    <section class="z-[1] px-3 pt-5 flex-1 max-w-6xl m-auto w-full flex flex-nowrap overflow-auto overflow-x-hidden">
      <Main />
      <Side />
    </section>
    <Footer />
  </main>
</template>
<script setup lang="ts">
import Header from './components/header/index.vue'
import Footer from './components/footer/index.vue'
import Main from './components/main/index.vue'
import Side from './components/side/index.vue'

import { useIntroduce } from './index'

onMounted(() => {
  setTimeout(() => {
    useIntroduce()
  }, 1000)
})
</script>
<style lang="scss" scoped></style>
