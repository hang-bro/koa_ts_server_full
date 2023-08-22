<template>
  <main class="w-full h-full p-5">
    <h1>BOOK</h1>

    <section>
      <el-form ref="formRef" :model="form" status-icon label-width="auto" class="demo-form">
        <el-form-item label="url" prop="url">
          <el-input v-model="form.url" autocomplete="off" />
        </el-form-item>
        <el-form-item label="start" prop="url">
          <el-input v-model.number="form.start" autocomplete="off" />
        </el-form-item>
      </el-form>
      <el-button @click="patchBook">爬取</el-button>
    </section>
    <section class="h-[500px] overflow-auto bg-white" v-draggable ref="bookRef">
      <div v-for="p in html">
        <p class="m-1  text-gray-500">{{ p }}</p>
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { http } from '@/http'

const bookRef = ref()
const html = ref()
const form = reactive({
  url: 'https://m.biqubao8.com/book/108395/',
  start: 461830,
})
console.log(`form ==>`, form)
const patchBook = () => {
  http.get('/api/patch/patchBook', { ...form }).then((res) => {
    // console.log(`res ==>`, res.data)
    html.value = res.data
    form.start += 1
    scrollTop()
  })
}
/**
 * 消息框滚动到顶部
 */
const scrollTop = () => (bookRef.value.scrollTop = 0)
</script>
<style lang="scss" scoped>
section {
  width: 500px;
  margin-bottom: 50px;
  border: 2px dashed #ccc;
  padding: 15px;
  margin: 20px;
  border-radius: 8px;
}
</style>
