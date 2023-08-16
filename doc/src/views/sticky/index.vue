<template>
  <main class="w-full h-full bg-gray-100 overflow-auto">
    <ul>
      <li v-for="item of 50" :key="item">
        <div class="title">标题{{ item }}</div>
        <div class="p-4" v-for="content of 5" :key="content">内容{{ item }}</div>
      </li>
    </ul>
  </main>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
ul {
  li {
    .title {
      background-color: pink;
      position: sticky;
      top: 0;
    }
  }
}
</style>
