<template>
  <header
    class="z-10 h-[50px] flex items-center bg-white justify-center shadow-lg animate__animated animate__fadeInDown">
    <div class="w-full px-3 flex items-center max-w-6xl justify-between text-gray-500 font-semibold">
      <div id="site-name" class="uppercase font-bold text-black text-lg opacity-0 sm:opacity-100">hang-bro</div>
      <div class="flex gap-3 items-center">
        <Search />
        <span class="ml-2 cursor-pointer text-black hidden sm:block max-w-[120px] overflow-hidden text-ellipsis">
          {{ user.username }}
        </span>
        <div>
          <el-dropdown trigger="click">
            <!-- 头像 -->
            <img
              :src="user.avatar"
              class="w-[40px] h-[40px] cursor-pointer rounded-full object-cover"
              @error="useErrorImg" 
              />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

        <!-- theme -->
        <div class="flex cursor-pointer" id="theme-change">
          <el-dropdown @command="(theme:ITheme) => config.setTheme(theme)" size="large">
            <span class="el-dropdown-link">
              主题<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :command="theme" v-for="theme in availableThemes">
                  {{ theme }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import useErrorImg from '@/hooks/useErrorImg'
import { ITheme, availableThemes } from '@/store/config'
import { useStore } from '@/hooks/useStore'
import router from '@/router'
import Search from './search.vue'
const user = useStore((store) => store.user)
const config = useStore((store) => store.config)
const logout = () => {
  useStore((s) => {
    s.user.$reset()
    console.log(` s.user ==>`, s.user.$state)
    s.config.$reset()
    router.push('/login')
  })
}
</script>
<style lang="scss" scoped></style>
