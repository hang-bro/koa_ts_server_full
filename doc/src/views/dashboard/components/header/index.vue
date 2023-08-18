<template>
  <header
    class="z-[2] h-[50px] flex items-center bg-white justify-center shadow-lg animate__animated animate__fadeInDown">
    <div class="w-full px-3 flex items-center max-w-6xl justify-between text-gray-500 font-semibold">
      <div id="site-name" class="uppercase font-bold text-black text-lg opacity-0 sm:opacity-100">hang-bro</div>
      <div class="flex items-center">
        <Search />
        <!-- <span class="ml-2 cursor-pointer text-black hidden sm:block max-w-[120px] overflow-hidden text-ellipsis">
          {{ user.username }}
        </span> -->
        <div>
          <el-dropdown trigger="click">
            <!-- 头像 -->
            <img
              :src="user.avatar"
              class="w-[40px] h-[40px] cursor-pointer rounded-full ml-2 object-cover"
              @error="useErrorImg" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- theme -->
        <div class="ml-3 cursor-pointer" id="theme-icon">
          <!-- dark -->
          <DarkMode
            @click="config.setTheme('light')"
            v-if="config.theme == 'dark'"
            theme="outline"
            size="30"
            class="animate__animated animate__fadeIn"
            fill="#666666" />
          <!-- light -->
          <SunOne
            @click="config.setTheme('dark')"
            v-else
            theme="outline"
            size="30"
            class="animate__animated animate__fadeIn"
            fill="#666666" />
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { DarkMode, SunOne } from '@icon-park/vue-next'
import { useStore } from '@/hooks/useStore'
import useErrorImg from '@/hooks/useErrorImg'
import Search from './search.vue'
import router from '@/router'
const user = useStore((store) => store.user)
const config = useStore((store) => store.config)
const logout = () => {
  useStore((s) => s.user.$reset())
  router.push('/login')
}
</script>
<style lang="scss" scoped></style>
