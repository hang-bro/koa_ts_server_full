<template>
  <main class="w-full h-full p-5 flex flex-col items-center justify-center overflow-scroll">
    <!-- 示例1 -->
    <section>
      <header>
        <div>示例1</div>
        <div>
          <el-button @click="eg1">演示</el-button>
        </div>
      </header>
      <div class="wrapper">
        <div :class="`eg1-${item}`" :style="useRandomBg()" v-for="item in 5"></div>
      </div>
    </section>

    <!-- 示例2 -->
    <section>
      <header>
        <div>示例2</div>
        <div>
          <el-button @click="eg2">演示</el-button>
        </div>
      </header>
      <div class="wrapper">
        <div :class="`eg2-${item}`" :style="useRandomBg()" v-for="item in 5"></div>
      </div>
    </section>

    <!-- 示例3 -->
    <section>
      <header>
        <div>示例3</div>
        <div>
          <el-button @click="eg3">演示</el-button>
        </div>
      </header>
      <div class="wrapper">
        <div :class="`eg3`" :style="useRandomBg()"></div>
      </div>
    </section>

    <!-- 示例4 -->
    <section>
      <header>
        <div>示例4</div>
        <div>
          <el-button @click="eg4">演示</el-button>
        </div>
      </header>
      <div class="wrapper">
        <div :class="`eg4-${item}`" class="!mx-3" :style="useRandomBg()" v-for="item in 5"></div>
      </div>
    </section>

    <!-- 示例5 -->
    <section>
      <header>
        <div>示例5</div>
        <div>
          <el-button @click="eg5">演示</el-button>
        </div>
      </header>
      <div class="content">
        <div class="char" v-for="item in 'hello world!'">{{ item == ' ' ? '&nbsp;' : item }}</div>
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { useRandomBg } from '@/hooks/useRandomBg'
import gsap from 'gsap'

const eg5 = () => {
  const t = gsap.timeline({})
  t.to('.char', {
    opacity: 1,
    delay: 0.1,
    duration: 0.5,
    y: 0,
    ease: 'Power4.inOut',
    stagger: 0.1,
  })
}
const eg4 = () => {
  const selectors = Array(5)
    .fill(null)
    .map((i, index) => '.eg4-' + (index + 1))

  selectors.map((item) => {
    // 先定义一条时间线
    const tl = gsap.timeline({ paused: true })
    // 开始基于时间线做一些动画 结合上面的 gsap.to 和 gsap.from
    tl.to(item, { x: 0, rotation: 360 * Math.random(), duration: 1, ease: 'power1.inOut' })
    tl.play()
  })
}

const eg3 = () => {
  // 先定义一条时间线
  const tl = gsap.timeline({ paused: true })
    // 开始基于时间线做一些动画 结合上面的 gsap.to 和 gsap.from
    tl.to('.eg3', { x: 200, rotation: 360, repeat: -1, yoyo: true, duration: 1.5, ease: 'power1.inOut' })
    tl.play()
}

const eg2 = () => {
  const selectors = Array(5)
    .fill(null)
    .map((i, index) => '.eg2-' + (index + 1))
    .toString()
  gsap.to(selectors, {
    duration: 2,
    y: 50,
  })
}

const eg1 = () => {
  const tl = gsap.timeline({
    defaults: {
      duration: 1,
      y: 50,
      repeat: -1,
      yoyo: true,
      ease: 'power1.in',
    },
  })
  tl.to('.eg1-1', {}).to('.eg1-2', {}).to('.eg1-3', {}).to('.eg1-4', {}).to('.eg1-5', {})
  return tl
}

onMounted(() => {})
</script>
<style lang="scss" scoped>
section {
  width: 500px;
  height: 300px;
  @apply border border-gray-300 border-dashed rounded-md p-5 pb-8 bg-gray-100/50 flex flex-col my-3 overflow-auto;
  header {
    @apply text-xl font-bold mb-2 flex items-center justify-between;
  }
  .wrapper {
    @apply flex items-center justify-center flex-1;
    div {
      width: 50px;
      height: 50px;
      margin: 0 5px;
    }
  }
}

.content {
  font-size: 30px;
  position: relative;
  color: black;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.char {
  display: inline-block;
  margin-right: 6px;
  opacity: 0.3;
  transform: translateY(-150px);
  transition: transform 0.3s ease-in-out;
}
</style>
