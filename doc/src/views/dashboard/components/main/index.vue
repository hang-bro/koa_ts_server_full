<template>
  <div class="flex-1 overflow-hidden animate__animated animate__fadeInLeft">
    <!--  Swiper  -->
    <div class="p-5 shadow-xl rounded-xl bg-gray-50 overflow-hidden" ref="mainRef">
      <Swiper :navigation="false" :scrollbar="false">
        <SwiperItme class="font-bold text-3xl text-black" :style="useRandomBg()" v-for="item in 5"
          >page {{ item }}</SwiperItme
        >
      </Swiper>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRandomBg } from '@/hooks/useRandomBg'
import SwiperItme from './swiper/swiper-item.vue'
import Swiper from './swiper/swiper.vue'

const mainRef = ref<HTMLElement>()
</script>
<style lang="scss" scoped></style>
