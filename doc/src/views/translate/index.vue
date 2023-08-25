<template>
  <main class="w-full h-full p-5">
    <section>
      <el-input v-model="state.input" :autosize="{ minRows: 4 }" type="textarea" />
      <el-button type="primary" plain class="my-3" @click="handleTranslate(true)">测试</el-button>
      <el-button type="primary" plain class="my-3" @click="handleTranslate()">翻译</el-button>
      <h1>结果</h1>
      <div class="flex gap-2">
        <div class="flex-1">
          <div class="text-3xl m-2">JP</div>
          <div
            contenteditable="true"
            class="whitespace-pre-wrap border border-success rounded-xl p-5 cursor-pointer outline-none"
            v-html="state.result.jp"></div>
        </div>
        <div class="flex-1">
          <div class="text-3xl m-2">En</div>
          <div
            contenteditable="true"
            class="flex-1 whitespace-pre-wrap border border-success rounded-xl p-5 cursor-pointer outline-none"
            v-html="state.result.en"></div>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { http } from '@/http'
import { reactive } from 'vue'
const state = reactive({
  input: '{\n\n}',
  result: {
    jp: '',
    en: '',
  },
})

const handleTranslate = (isDev = false) => {
  if (!state.input) return ElMessage.warning('请输入json数据!')
  const cleaned = state.input.replace(/\/\*\*[\s\S]*?\*\//g, '')
  // console.log(`cleaned ==>`,cleaned);
  const json = eval(`(()=>{const obj=${cleaned};return obj;})()`)
  console.log(`json ==>`, json)
  http.post<any>('/api/translate', { input: json, isDev }).then((res) => {
    console.log(`res ==>`, res)
    state.result.en = res.data.enTrans
    state.result.jp = res.data.jpTrans
  })
}
</script>
<style lang="scss" scoped></style>
