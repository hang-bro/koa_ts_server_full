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
import userStore from '@/store/user'
import { http } from './http'
import router from './router'
const locale = ref(zhCn)

const store = userStore()

// onBeforeMount(() => {
//   if (!import.meta.env.DEV) {
//     try {
//       console.error('生产环境禁止调试！'),
//         setInterval(() => {
//           debugger
//         }, 50)
//     } catch (e) {
//       console.log(e)
//     }
//   }
// })
onMounted(() => {
  useStore((store) => {
    document.documentElement.classList.add(store.config.theme || 'light')
  })
  http.get<UserInfo>('/login/getInfo').then((res) => store.setInfo(res.data))
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
