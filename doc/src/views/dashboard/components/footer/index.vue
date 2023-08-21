<template>
  <footer
    class="h-[50px] cursor-pointer flex items-center justify-center text-gray-500 animate__animated animate__fadeInUp">
    <div class="max-w-5xl text-sm text-gray-400 text-hover flex justify-center items-center">
      <div @click="getText">「{{ state.text }}」</div>
      <div class="opacity-0 text-center text-xs flex items-center transition-all duration-500">
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
  http.get<any>('https://v1.hitokoto.cn/').then((res: any) => {
    console.log(`res ==>`, res)
    state.text = res.hitokoto
    state.from = (res.from_who || '') + '-' + res.from
    console.log(`state ==>`, state)
  })
}

onMounted(() => {
  getText()
})
</script>
<style lang="scss" scoped>
.text-hover {
  &:hover {
    .opacity-0 {
      @apply transition-all duration-500;
      opacity: 1;
    }
  }
}
</style>
