<template>
  <div class="flex-1 overflow-hidden animate__animated animate__fadeInLeft">
    <!--  Swiper  -->
    <div class="p-5 shadow-xl rounded-xl bg-gray-50 overflow-hidden" ref="mainRef">
      <Swiper :navigation="false" :scrollbar="false">
        <SwiperItme class="font-bold text-3xl text-black" :style="useRandomBg()" v-for="item in imgs">
          <img :src="item" alt="" />
        </SwiperItme>
      </Swiper>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRandomBg } from '@/hooks/useRandomBg'
import SwiperItme from './swiper/swiper-item.vue'
import Swiper from './swiper/swiper.vue'
import { http } from '@/http'

const mainRef = ref<HTMLElement>()

const imgs = ref([])
await http.get<any>('/api/patch/patchList').then((res) => {
  console.log(`res ==>`, res)
  imgs.value = imgs.value = res.data.map((i) => `${import.meta.env.VITE_BASE_URL}/download/hotPic/${i}`).splice(0,5)
})
</script>
<style lang="scss" scoped></style>
