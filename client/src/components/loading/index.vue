<template>
  <section class="w-full flex flex-wrap">
    <div class="loading-item">
      <Loading1 />
    </div>
    <div class="loading-item">
      <Loading2 />
    </div>
    <div class="loading-item">
      <Loading3 />
    </div>
    <div class="loading-item">
      <Loading3 />
    </div>
    <div class="loading-item">
      <Loading3 />
    </div>
  </section>
</template>
<script lang="ts" setup>
import Loading1 from './1.vue'
import Loading2 from './2.vue'
import Loading3 from './3.vue'
</script>
<style lang="scss" scoped>
.loading-item {
  @apply h-52 w-1/2 p-2 cursor-pointer;
}
</style>
