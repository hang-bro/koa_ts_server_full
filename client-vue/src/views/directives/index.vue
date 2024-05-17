<template>
  <main class="w-full h-full overflow-auto no-scroll">
    <header class="z-10 bg-gray-300 mb-5 p-4 text-xl font-bold sticky top-0">
      directives(指令) 代码地址==>
      <span class="text-gray-500">'@/directives/module'</span>
    </header>
    <!-- resize -->
    <section>
      <header @click="showSourceCode('/src/directives/module/resize.ts')">
        resize 代码地址==> '@/directives/module/resize'
      </header>
      <div class="p-4 bg-gray-50 mt-3 border border-dashed border-gray-400/40 rounded" v-resize="handleResize">
        resize (改变浏览器大小可触发)
      </div>
      <div class="p-4 bg-gray-50 mt-3 border border-dashed border-gray-400/40 rounded">{{ resizeInfo }}</div>
    </section>

    <!-- copy -->
    <section>
      <header>copy 代码地址==> '@/directives/module/copy'</header>
      <div class="p-4 bg-gray-50 mt-3 border border-dashed border-gray-400/40 rounded" v-resize="handleResize">
        <el-input class="!w-[250px]" v-model="copyValue">
          <template #append>
            <Copy v-copy="copyValue" class="cursor-pointer" />
          </template>
        </el-input>
      </div>
    </section>

    <!-- focus -->
    <section>
      <header>focus 代码地址==> '@/directives/module/focus'</header>
      <div class="p-4 bg-gray-50 mt-3 border border-dashed border-gray-400/40 rounded" v-resize="handleResize">
        <el-input class="!w-[250px]" v-focus v-model="focusValue" placeholder="自动获取焦点(刷新页面可查看)" />
        <!-- <input class="!w-[250px]" v-focus v-model="focusValue" placeholder="自动获取焦点" /> -->
      </div>
    </section>

    <!-- waterMark -->
    <section>
      <header>waterMark 代码地址==> '@/directives/module/waterMark'</header>
      <div class="p-4 bg-gray-50 mt-3 border border-dashed border-gray-400/40 rounded" v-resize="handleResize">
        <div
          class="w-full h-[200px] flex items-center justify-center text-gray-500"
          v-watermark="{ text: 'hang-bro', textColor: 'rgba(180, 180, 180, 0.4)' }">
          watermark
        </div>
      </div>
    </section>

    <!-- longpress -->
    <section>
      <header>longpress 代码地址==> '@/directives/module/longpress'</header>
      <div class="p-4 bg-gray-50 mt-3 border border-dashed border-gray-400/40 rounded" v-resize="handleResize">
        <div class="w-full">
          <el-button class="w-full" v-longpress="{ callback: handleLongPress }"> 长按可触发</el-button>
        </div>
      </div>
    </section>

    <!-- 防抖 -->
    <section>
      <header>debounce(防抖) 代码地址==> '@/directives/module/debounce'</header>
      <div class="p-4 bg-gray-50 mt-3 border border-dashed border-gray-400/40 rounded" v-resize="handleResize">
        <div class="w-full">
          <el-button class="w-full" v-debounce="{ callback: handleDebounce, delay: 1000 }">
            设置(一直点击不会触发,间隔1s触发)
          </el-button>
        </div>
      </div>
    </section>

    <!-- 节流-->
    <section>
      <header>throttle(节流) 代码地址==> '@/directives/module/throttle'</header>
      <div class="p-4 bg-gray-50 mt-3 border border-dashed border-gray-400/40 rounded" v-resize="handleResize">
        <div class="w-full">
          <el-button class="w-full" v-throttle="{ callback: handleThrottle }"> 设置(规定时间内只能点击一次) </el-button>
        </div>
      </div>
    </section>

    <!-- draggable-->
    <section>
      <header>draggable 代码地址==> '@/directives/module/draggable'</header>
      <div class="p-4 bg-gray-50 mt-3 border border-dashed border-gray-400/40 rounded" v-resize="handleResize">
        <div class="w-full h-[200px]">
          <div class="dialog-model select-none" v-draggable>draggable(拖动我)</div>
        </div>
      </div>
    </section>

    <!-- touchDirection-->
    <section>
      <header>touchDirection 代码地址==> '@/directives/module/touchDirection'</header>
      <div class="p-4 bg-gray-50 mt-3 border border-dashed border-gray-400/40 rounded" v-resize="handleResize">
        <div class="w-full h-[200px]" v-touchDirection="fn">在此区域滑动</div>
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { Copy } from '@icon-park/vue-next'

const fn = (direction: string) => {
  console.log(`direction ==>`, direction)
}

const resizeInfo = ref()
const focusValue = ref()
const copyValue = ref('copy')
const handleResize = (e: { width: number; height: number }) => {
  resizeInfo.value = e
}

/**长按 */
const handleLongPress = () => {
  ElMessage.success('Long Press')
}

const handleDebounce = () => {
  ElMessage.success('debounce')
}
const handleThrottle = () => {
  ElMessage.success('trottle')
}
</script>
<style lang="scss" scoped>
section {
  @apply p-5 bg-gray-100 mx-5 mb-5 rounded-md border;
}
</style>
