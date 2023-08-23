<template>
  <main class="w-full h-full p-5">
    <h1>BOOK</h1>
    <section>
      <el-select class=" !w-full" @change="getBook" v-model="selectTitle" filterable>
        <el-option v-for="item in bookList" :key="item" :label="item" :value="item" />
      </el-select>
    </section>
    <section class="h-[500px] overflow-auto bg-white" v-draggable ref="bookRef">
      <div v-for="p in html">
        <p class="m-1 text-gray-500">{{ p }}</p>
      </div>
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
  width: 500px;
  margin-bottom: 50px;
  border: 2px dashed #ccc;
  padding: 15px;
  margin: 20px;
  border-radius: 8px;
}
</style>
