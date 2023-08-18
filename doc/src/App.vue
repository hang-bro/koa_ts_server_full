<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-28 20:03:56
-->
<template>
  <ElConfigProvider :locale="locale">
    <Layout />
  </ElConfigProvider>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import Layout from '@/components/layout/index.vue'
import { useStore } from './hooks/useStore'
import { ElNotification } from 'element-plus'
const locale = ref(zhCn)
onMounted(() => {
  useStore((store) => {
    document.documentElement.classList.add(store.config.theme || 'light')
  })
})

onErrorCaptured((err) => {
  if (import.meta.env.DEV) {
    console.log(`err ==>`, err)
    ElNotification({
      dangerouslyUseHTMLString: true,
      message: `<strong>${err}</strong>`,
      type: 'error',
    })
    return false
  }
})
</script>
<style>
#app {
  @apply w-screen h-screen overflow-visible relative;
}
</style>
