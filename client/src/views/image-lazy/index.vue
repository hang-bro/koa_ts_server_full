<template>
  <main class="w-full h-full p-5 overflow-auto" ref="mainRef">
    <img
      class="max-w-full object-cover cursor-pointer"
      :data-src="img"
      src="https://th.wallhaven.cc/lg/d6/d6o77l.jpg"
      alt=""
      @click="handlePreview"
      v-for="img in imgs" />
  </main>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { http } from '@/http'
import viewImg from '@/components/ViewImg/index'

const imgs = ref([])
const mainRef = ref()

const handlePreview = (e: PointerEvent) => {
  const target = e.target as HTMLImageElement
  const src = target.getAttribute('data-src')
  console.log(`src ==>`, src)
  viewImg({ url: src })
}
onMounted(async () => {
  await http.get<any>('/api/patch/patchList').then((res) => {
    console.log(`res ==>`, res)
    imgs.value = imgs.value = res.data.map((i) => `${import.meta.env.VITE_BASE_URL}/download/hotPic/${i}`)
  })

  Array.from(mainRef.value.children as NodeListOf<Element>).map((e: HTMLImageElement) => {
    const observer = new IntersectionObserver((entries) => {
      // 可见性变化处理
      entries.forEach((entry) => {
        /** 元素可见*/
        if (entry.isIntersecting) {
          e.setAttribute('src', e.getAttribute('data-src'))
          observer.unobserve(e)
        } else {
        }
      })
    })
    observer.observe(e)
  })
})
</script>
<style lang="scss" scoped></style>
