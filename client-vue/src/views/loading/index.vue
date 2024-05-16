<template>
  <main class="w-full h-full">
    <a href="https://cssloaders.github.io/" target="_blank">https://cssloaders.github.io/</a>
    <section class="w-full flex flex-wrap">
      <div class="loading-item" v-for="item in data">
        <component :is="item.name" />
      </div>
      
    </section>
  </main>
</template>
<script lang="ts" setup>
import loading from '@/components/loading/index'
const data = await loading()
</script>
<style lang="scss" scoped>
.loading-item {
  @apply h-[300px] w-1/3 p-1 cursor-pointer;
}
</style>
