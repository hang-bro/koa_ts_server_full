<template>
  <main class="w-full h-full p-5">
    <section>
      <el-input v-model="state.input" :autosize="{ minRows: 4 }" type="textarea" />
      <el-button type="primary" plain class="my-3" @click="handleTranslate">翻译</el-button>
      <h1>结果</h1>
      <div
        contenteditable="true"
        class="whitespace-pre-wrap border border-success rounded-xl p-5 cursor-pointer outline-none"
        v-html="state.result"></div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { http } from '@/http'
import { reactive } from 'vue'
const state = reactive({
  input: '{\n\n}',
  result: '',
})

const handleTranslate = () => {
  if (!state.input) return ElMessage.warning('请输入json数据!')
  const cleaned = state.input.replace(/\/\*\*[\s\S]*?\*\//g, '')
  // console.log(`cleaned ==>`,cleaned);
  const json = eval(`(()=>{const obj=${cleaned};return obj;})()`)
  console.log(`json ==>`, json)
  http.post('/api/translate', { input: json }).then((res) => {
    console.log(`res ==>`, res)
    state.result = res.data
  })
}
</script>
<style lang="scss" scoped></style>
