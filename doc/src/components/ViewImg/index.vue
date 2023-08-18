<!--
 * @Description: 预览图片
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-06 22:19:10
-->
<script setup lang="ts">
import { ref, reactive, onMounted, computed, nextTick } from 'vue'
import { IProp } from '.'
const imgRef = ref()
const state = reactive({
  show: false,
  imgUrl: '' as any,
  /**是否可以通过点击 遮罩 关闭   默认true */
  closeOnClickModel: true,
})
const transform = reactive({
  scale: 1,
  rotate: 0,
})

const imgStyle = computed(() => `transform:scale(${transform.scale}) rotate(${transform.rotate}deg)`)
const close = () => (state.show = false)

const open = (prop: IProp) => {
  const { url, closeOnClickModel } = prop
  state.imgUrl = url
  //判断传入参数是否启用 closeOnClickModel
  if (closeOnClickModel === false) state.closeOnClickModel = closeOnClickModel

  state.show = true
  reset()
  addEvent()
}

const reset = () => {
  transform.rotate = 0
  transform.scale = 1
}
/**添加相关监听事件 */
const addEvent = () => {
  /**
   * 监听 ESC 键盘事件
   */
  document.onkeydown = (e: KeyboardEvent) => {
    //此处填写你的业务逻辑即可
    if (e.key === 'Escape') {
      state.show = false
      //移除监听
      document.onkeydown = null
    }
  }
  //不使用nextTick会造成获取不到imgRef.value
  nextTick(() => {
    // 图片加载完成回调函数
    imgRef.value.onload = () => {
      // 添加鼠标滚动事件
      ;(imgRef?.value as any).onmousewheel = (e: WheelEvent) => {
        if (e.deltaY > 0) {
          //缩小
          transform.scale > 0.2 ? (transform.scale -= 0.1) : '' //此处进行最小缩放限制  否则会造成图片不存在 和其他bug
        } else {
          //放大
          transform.scale += 0.2
        }
      }
    }
  })
}
defineExpose({
  close,
  open,
})
</script>

<template>
  <Transition mode="out-in">
    <div
      class="z-[999999] cursor-pointer flex flex-col items-center justify-center absolute top-0 w-full h-screen overflow-hidden"
      v-if="state.show">
      <div
        @click="state.closeOnClickModel ? (state.show = false) : ''"
        class="absolute w-full h-full top-0 left-0 opacity-50 bg-black"></div>
      <div class="p-5 absolute z-[2] bottom-[40px] bg-black bg-opacity-30 rounded-[10px]">
        <!-- 放大 -->
        <button size="large" @click="transform.scale += 0.1" class="hang i-bigger" circle></button>
        <!-- 缩小 -->
        <button
          size="large"
          @click="transform.scale > 0.2 ? (transform.scale -= 0.1) : ''"
          class="hang i-smaller"
          circle></button>
        <!-- 旋转 -->
        <button size="large" @click="transform.rotate += 90" class="hang i-rotate" circle></button>
        <!-- 关闭 -->
        <button size="large" @click="close" class="hang i-close" circle></button>
      </div>
      <img
        class="cursor-pointer z-[1] w-4/5 duration-500 ease-in-out"
        ref="imgRef"
        :style="imgStyle"
        :src="state.imgUrl"
        alt="" />
    </div>
  </Transition>
</template>
<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.7s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

button {
  font-size: 30px;
  background: transparent;
  color: #fff;
  border: none;
  margin: 0 10px;

  &:hover {
    font-weight: bold;
  }
}
</style>
