<template>
  <main class="w-full h-full bg-none relative bg-black/30 flex justify-center items-center">
    <span class="loader"></span>
  </main>
</template>
<script lang="ts">
export default {
  name: 'loading15',
}
</script>
<script lang="ts" setup></script>

<style type="text/css" scoped>
.loader {
  position: relative;
  width: 100px;
  height: 100px;
}

.loader:before , .loader:after{
  content: '';
  border-radius: 50%;
  position: absolute;
  inset: 0;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.3) inset;
}
.loader:after {
  box-shadow: 0 2px 0 #FF3D00 inset;
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  0% {  transform: rotate(0)}
  100% { transform: rotate(360deg)}
}
</style>
