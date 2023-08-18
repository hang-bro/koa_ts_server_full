<template>
  <div ref="mainRef" class="w-full h-full">
    <slot :useRandomBg="useRandomBg"></slot>
  </div>
</template>
<script lang="ts" setup>
import { useRandomBg } from '@/hooks/useRandomBg'

const props = withDefaults(
  defineProps<{
    /**
     * 过度动画名称
     * default ==> fadeInRight
     * 参考 https://animate.style/
     */
    animate?: string

    /**过渡时间 default ==> 0.5s */
    delay?: string
  }>(),
  {
    animate: 'fadeInRight',
    delay: '0.5s',
  },
)

const mainRef = ref()
let observer: IntersectionObserver
onMounted(() => {
  Array.from(mainRef.value.children as NodeListOf<Element>).map((e) => {
    observer = new IntersectionObserver((entries) => {
      // 可见性变化处理
      entries.forEach((entry) => {
        /** 元素可见*/
        if (entry.isIntersecting) {
          e.classList.add('animate__animated')
          e.classList.add('animate__' + props.animate)
          e.classList.add('animate__delay-' + props.delay)
        } else {
          // e.classList.remove('animate__animated')
          // e.classList.remove('animate__' + props.animate)
          // e.classList.remove('animate__delay-' + props.delay)
          // console.log(`元素不可见 ==>`)
        }
      })
    })
    observer.observe(e)
  })
})

onUnmounted(() => (observer = null))
</script>
<style lang="scss"></style>
