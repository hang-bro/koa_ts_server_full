<template>
  <div class="flex-1 overflow-hidden animate__animated animate__fadeInLeft" ref="mainRef">
    <!--  Swiper  -->
    <div class="p-5 shadow-xl rounded-xl bg-gray-50 overflow-hidden">
      <div>
        <div
          v-if="imgs.length == 0"
          :style="useRandomBg()"
          class="w-full h-[400px] bg-gray-200 flex items-center justify-center text-gray-400">
          <loading-one class="animate-spin" theme="outline" size="24" fill="#333" />
        </div>
        <Swiper :speed="2000" :navigation="false" :scrollbar="false" v-else>
          <SwiperItme
            class="font-bold text-3xl text-black rounded-md overflow-hidden"
            :style="useRandomBg()"
            v-for="item in imgs">
            <img loading="lazy" class="w-full h-full object-cover" :src="item.url" alt="" />
          </SwiperItme>
        </Swiper>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { LoadingOne } from '@icon-park/vue-next'
import { useRandomBg } from '@/hooks/useRandomBg'
import SwiperItme from './swiper/swiper-item.vue'
import Swiper from './swiper/swiper.vue'
import { http } from '@/http'
const mainRef = ref<HTMLElement>()

const imgs = ref([])
onMounted(() => {
  mainRef.value.addEventListener('animationend', function () {
    console.log(`css3运动结束！ ==>`)
    http.get<any>('/user/bannerList').then((res) => {
      imgs.value = res.data
    })
  })
})
</script>
<style lang="scss" scoped></style>
