<template>
  <main class="w-full h-full p-5">
    <h1>BOOK</h1>
    <section>
      <el-select class="!w-full" @change="getBook" v-model="selectTitle" filterable>
        <el-option v-for="item in bookList" :key="item" :label="item" :value="item" />
      </el-select>
    </section>
    <section class="h-[500px] opacity-0 overflow-auto no-scroll bg-white hover:opacity-100" v-draggable ref="bookRef">
      <div v-html="html" class="whitespace-pre-wrap text-gray-600 leading-[30px] font-sans"></div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { http } from '@/http'
const bookRef = ref()
const html = ref()
const selectTitle = ref()
const bookList = ref([])

const getBook = (name: string) => {
  http.get<any>(`${import.meta.env.VITE_BASE_URL}/download/book/${name}`, {}, { responseType: 'text' }).then((res) => {
    console.log(`res ==>`, res)
    html.value = res
    scrollTop()
  })
}
onMounted(() => {
  http.get<any>('/api/patch/patchBookList').then((res) => {
    bookList.value = res.data
  })
})
/**
 * 消息框滚动到顶部
 */
const scrollTop = () => (bookRef.value.scrollTop = 0)
</script>
<style lang="scss" scoped>
section {
  width: 300px;
  font-size: 15px;
  margin-bottom: 50px;
  border: 2px dashed #ccc;
  padding: 15px;
  margin: 20px;
  border-radius: 8px;
}
</style>
