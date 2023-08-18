<template>
  <!-- Slider main container -->
  <div class="swiper aspect-video" :style="props.style">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <slot></slot>
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev" v-if="props.navigation"></div>
    <div class="swiper-button-next" v-if="props.navigation"></div>

    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar" v-if="props.scrollbar"></div>
  </div>
</template>
<script lang="ts" setup>
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay, Scrollbar } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
type IProps = {
  /**
   * 自动播放
   */
  autoplay: boolean
  /**
   * 循环
   */
  loop: boolean
  /**
   * horizontal (横向)
   *
   * vertical   (竖向)
   */
  direction: 'horizontal' | 'vertical'
  /**
   * pagination 底部小圆点
   */
  pagination: boolean | { el: string; type: 'bullets' | 'fraction' | 'progressbar' | 'custom' }
  /**
   * navigation
   */
  navigation:
    | boolean
    | {
        nextEl: string
        prevEl: string
      }
  /**
   * scrollbar
   */
  scrollbar:
    | {
        el: '.swiper-scrollbar'
      }
    | boolean
  style: {
    /**
     * width
     */
    width: string
    /**
     * height
     */
    height?: string
  }
}

const props = withDefaults(defineProps<Partial<IProps>>(), {
  autoplay: true,
  direction: 'horizontal',
  pagination: () => ({
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
  }),
  navigation: () => ({
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }),
  scrollbar: () => ({
    el: '.swiper-scrollbar',
  }),
  style: () => ({
    width: '100%',
  }),
})
let swiper: Swiper

watch(
  () => props.style.width,
  (newV) => {
    generateSwiper()
  },
)

const generateSwiper = () => {
  // console.log(`generateSwiper ==>`, props)
  if (swiper) return swiper.update()
  swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination, Autoplay, Scrollbar],
    ...props,
  })
}
onMounted(() => {
  generateSwiper()
})

onUnmounted(() => {
  swiper && swiper.destroy()
})
</script>
<style lang="scss" scoped></style>
