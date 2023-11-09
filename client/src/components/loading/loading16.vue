<template>
  <main class="w-full h-full bg-none relative bg-black/30 flex justify-center items-center">
    <span class="loader"></span>
  </main>
</template>
<script lang="ts">
export default {
  name: 'loading16',
}
</script>
<script lang="ts" setup></script>

<style type="text/css" scoped>
.loader {
  position: relative;
  width: 64px;
  height: 64px;
  background-color: rgba(0, 0, 0, 0.5);
  transform: rotate(45deg);
  overflow: hidden;
}
.loader:after {
  content: '';
  position: absolute;
  inset: 8px;
  margin: auto;
  background: rgb(133, 135, 137);
}
.loader:before {
  content: '';
  position: absolute;
  inset: -15px;
  margin: auto;
  background: #de3500;
  animation: diamondLoader 2s linear infinite;
}
@keyframes diamondLoader {
  0%,
  10% {
    transform: translate(-64px, -64px) rotate(-45deg);
  }
  90%,
  100% {
    transform: translate(0px, 0px) rotate(-45deg);
  }
}
</style>
