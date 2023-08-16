<template>
  <main class="w-full h-full p-5">
    <h1>web-worker</h1>
    <section class="my-5">
      <el-button type="success" @click="sendMessage">发送消息</el-button>
    </section>
  </main>
</template>
<script lang="ts" setup>
let worker: Worker
const sendMessage = () => {
  worker.postMessage('我是index.vue' + Math.random()) // 向 worker 线程发送消息，对应 worker 线程中的 e.data
}
onMounted(() => {
  worker = new Worker(new URL('./worker.ts', import.meta.url).href, { type: 'module' })
  worker.addEventListener('message', (e) => {
    // 接收消息
    console.log('接收worker消息==>', e.data) // Greeting from Worker.js，worker线程发送的消息
  })
})
</script>
<style lang="scss" scoped></style>
