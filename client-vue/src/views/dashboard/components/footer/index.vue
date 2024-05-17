<template>
  <footer
    class="h-[50px] cursor-pointer flex items-center justify-center text-gray-500 animate__animated animate__fadeInUp">
    <div class="max-w-5xl text-sm text-gray-400 text-hover flex justify-center items-center">
      <div @click="getText">「{{ state.text }}」</div>
      <div class="hidden text-center text-xs items-center transition-all duration-500">
        <span>{{ state.from }}</span>
        <copy class="ml-1" @click="useCopy(state.text)" theme="outline" fill="#cccc" />
      </div>
    </div>
  </footer>
</template>
<script lang="ts" setup>
import { http } from '@/http'
import { Copy } from '@icon-park/vue-next'
import useCopy from '@/hooks/useCopy'

const state = reactive({
  text: '',
  from: '',
})
const getText = () => {
  http.get<any>('/hitokoto').then((res: any) => {
    state.text = res.data.hitokoto
    state.from = (res.data.from_who || '') + '-' + res.data.from
  })
}

onMounted(() => {
  getText()
})
</script>
<style lang="scss" scoped>
.text-hover {
  &:hover {
    .hidden {
      @apply transition-all duration-500;
      display: flex;
    }
  }
}
</style>
