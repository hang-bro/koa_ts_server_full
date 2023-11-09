<!--
 * @Description: loading
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-06 22:19:10
-->
<script setup lang="ts">
import useLoading from '@/components/loading'
import defaultLoading from '@/components/loading/loading1.vue'

const show = ref(false)
const componentIs = shallowRef()

const close = () => {
  console.log(`close ==>`)
  show.value = false
}

const open = async (_name?: string) => {
  console.log(`open ==>`,);
  const loadings = await useLoading()
  if (!_name) {
    componentIs.value = loadings[Math.floor(Math.random() * loadings.length)]
  } else {
    const component = loadings.filter((i) => i.name == _name)[0]
    if (!component) {
      componentIs.value = defaultLoading
      ElNotification({
        title: 'Error',
        message: _name + '组件不存在',
        type: 'error',
      })
    } else {
      componentIs.value = component
    }
  }
  show.value = true
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
      v-if="show">
      <component :is="componentIs" />
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
</style>
