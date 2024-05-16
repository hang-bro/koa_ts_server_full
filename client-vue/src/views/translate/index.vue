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
          <Code language="json" :html="state.result.ja" />
        </div>
        <div class="flex-1">
          <div class="text-3xl m-2">En</div>
          <Code language="json" :html="state.result.en" />
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { http } from '@/http'
import Prism from 'prismjs'
import { reactive } from 'vue'
import Code from '../../components/code/index.vue'
const state = reactive({
  input: '{\n\n}',
  result: {
    ja: '',
    en: '',
  },
})

const handleTranslate = (isTest = false) => {
  if (!state.input) return Message.error('请输入json数据!')
  const json = eval(`(()=>{const obj=${state.input.replace(/\/\*\*[\s\S]*?\*\//g, '')};return obj;})()`)
  http.post<any>('/translate', { inputObj: json, isTest }).then((res) => {
    state.result.en = res.data.enTrans
    state.result.ja = res.data.jaTrans
  })
}

onMounted(() => {
  Prism.highlightAll() // 切换更
})
</script>
<style lang="scss" scoped></style>
