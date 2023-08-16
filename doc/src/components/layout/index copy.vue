<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-17 16:44:44
-->
<template>
  <main class="h-full w-full p-5">
    <div v-for="(item, index) in list" :key="index" class="mb-5">
      <RouterLink :to="item.url">{{ item.name }}</RouterLink>
    </div>

    <div ref="customRef" class="custom cursor-pointer" @click="custom">custom</div>
  </main>
</template>
<script setup lang="ts">
import routes from '@/router/routes'
const customRef = ref()
const list = ref([])

const custom = () => {
  customRef.value.classList.add('error-shake')
  customRef.value.style.setProperty('--error-content', "'this is a error message'")
  setTimeout(() => {
    customRef.value.classList.remove('error-shake')
  }, 1000)
}
const modules = import.meta.glob('../**/index.vue')
// 循环进入路由
for (let key in modules) {
  const name = key.split('/')[1]
  list.value.push({
    name: name,
    url: name,
  })
}
</script>
<style lang="scss" scoped>
.custom {
  transition: all ease 0.2s;
  user-select: none;
  @apply relative p-3 bg-gray-400 rounded-md flex items-center justify-center;
  &:active {
    transform: translateY(3px);
  }
}
.error-shake {
  animation: shake 0.3s ease-in-out;

  &::after {
    content: var(--error-content);
    position: absolute;
    left: 0;
    top: 100%;
    color: red;
  }
}
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
