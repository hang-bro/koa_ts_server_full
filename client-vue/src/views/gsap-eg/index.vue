<template>
  <main class="w-full h-full">
    <div
      ref="boxRef"
      @click="
        gsap.to(boxRef, {
          rotation: 360,
          x: '100vw',
          xPercent: -100,
          // special properties
          duration: 5, // how long the animation lasts
          repeat: -1, // the number of repeats - this will play 3 times
          yoyo: true, // this will alternate back and forth on each repeat. Like a yoyo
          border: '3px solid purple',
          borderRadius: '50%',
        })
      "
      class="box mt-5 w-20 h-20 rounded-lg bg-success"></div>
  </main>
</template>
<script lang="ts" setup>
import { gsap } from 'gsap'
import { onMounted } from 'vue'
const boxRef = ref()
onMounted(() => {})
</script>
<style lang="scss" scoped></style>
