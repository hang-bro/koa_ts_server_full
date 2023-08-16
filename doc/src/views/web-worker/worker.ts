// worker.js（worker线程）
import add from './util' // 导入外部js

// worker.js（worker线程）
self.addEventListener('message', (e) => {
  // 接收到消息
  console.log('接收到index.vue消息==>' + e.data) // Greeting from Main.js，主线程发送的消息
  postMessage('this is a Worker.js message') // 向主线程发送消息
  console.log(`  add(6,6) ==>`, add(6, 6))
})
