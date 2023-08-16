<!--
 * @Description: svg组件 结合 vite-plugin-svg-icons使用
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2022-08-18 17:00:23
-->
<script setup lang="ts">
defineProps<{ name: string; class?: string }>()
</script>
<template>
  <svg :class="class">
    <use :href="'#icon-' + name"></use>
  </svg>
</template>
<style lang="scss" scoped></style>
