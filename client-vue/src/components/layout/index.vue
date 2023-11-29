<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-28 20:03:56
-->
<template>
  <RouterView v-slot="{ Component, route: { meta } }">
    <!-- @vue-ignore -->
    <Transition
      :enter-active-class="meta.enterActive ? meta.enterActive : 'animate__animated animate__fadeInLeft'"
      :leave-active-class="meta.leaveActive ? meta.leaveActive : 'animate__animated animate__fadeOutUp'"
      mode="in-out">
      <Suspense>
        <!-- 主要内容 -->
        <component :is="Component"></component>
        <!-- 加载中状态 -->
        <template #fallback>
          <main class="w-screen h-screen absolute">
            <el-skeleton :rows="10" animated />
          </main>
        </template>
      </Suspense>
    </Transition>
  </RouterView>
  <div
    class="absolute right-[50px] bottom-[50px] p-3 bg-slate-100/70 shadow-xl rounded-full cursor-pointer hover:translate-y-[-5px] transition-all"
    @click="$router.back()"
    v-if="showBackIcon">
    <Back theme="outline" size="30" fill="#666666" />
  </div>
</template>
<script setup lang="ts">
import { Back } from '@icon-park/vue-next'
import { useRoute } from 'vue-router'
const route = useRoute()
const showBackIcon = computed(() => {
  const hidePaths = ['/login', '/regist', '/resetPwd', '/welcome','/dashboard','/dev']
  return !hidePaths.includes(route.path)
})
</script>
<style lang="scss">
main {
  position: absolute;
}
</style>
