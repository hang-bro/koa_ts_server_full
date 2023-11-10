<template>
  <main class="w-full h-full p-5">
    <div class="scroll1 w-[300px] h-[500px] overflow-scroll overflow-x-hidden">
      <div v-for="item in 150">{{ item }}</div>
    </div>
  </main>
</template>
<script lang="ts" setup></script>
<style lang="scss">
.scroll1 {
  &::-webkit-scrollbar {
    background-color: rgba(141, 124, 124, 0.07);
    width: 8px;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #12b7f5;
    background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 93, 143, 1) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 93, 143, 1) 50%,
      rgba(255, 93, 143, 1) 75%,
      transparent 75%,
      transparent
    );
    border-radius: 6px;
    -webkit-transition: background 200ms ease;
    -moz-transition: background 200ms ease;
    transition: background 200ms ease;
  }
}
</style>
