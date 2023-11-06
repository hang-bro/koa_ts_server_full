<template>
  <main class="w-full h-full p-5 overflow-x-hidden">
    <ScrollBox animate="zoomIn">
      <template #default="{ useRandomBg }">
        <div class="p-10 h-[200px] my-2 cursor-pointer" v-for="item in 100" :key="item" :style="useRandomBg()">
          box{{ item }}
        </div>
      </template>
    </ScrollBox>
  </main>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
