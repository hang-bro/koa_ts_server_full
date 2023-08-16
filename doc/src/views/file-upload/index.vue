<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-17 14:13:50
-->
<template>
  <main class="w-full h-full p-5 bg-gray-100">
    <el-upload :limit="1" ref="uploadRef" class="upload-demo" :auto-upload="false" @change="fileChange">
      <template #trigger>
        <el-button type="primary">选择文件</el-button>
      </template>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template>
    </el-upload>
    <el-button class="ml-3" type="success" @click="submitUpload()"> upload to server </el-button>
    <div>
      <el-progress type="dashboard" :percentage="+state.percentage.toFixed(2)" :color="colors" />
    </div>
  </main>
</template>
<script lang="ts" setup>
import { http } from '@/http';
import type { UploadInstance } from 'element-plus'
const state = reactive({
  percentage: 0
})
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
const uploadRef = ref<UploadInstance>()
// 每一片大小
const chunkSize = 1024 * 1024 * 10 // MB
const fileList = ref()
const fileChange = (f: any) => {
  fileList.value = f.raw
}

function submitUpload(index?: number /* 当前片下标 */) {
  index = index ? index : 0
  console.log(`index ==>`, index)
  // 获取上传文件
  const file = fileList.value
  // [ 文件名, 文件后缀 ]
  const [fname, fext] = file.name.split('.')
  // 获取当前片的起始字节
  const start = index * chunkSize
  console.log(`start > file.size ==>`, start, file.size)
  if (start > file.size) {
    // 当超出文件大小，停止递归上传
    console.log(`文件上传完成,开始合并`)
    state.percentage = 100
    merge(file.name)
    return
  }
  const blob = file.slice(start, start + chunkSize)
  // 为每片进行命名
  const blobName = `${fname}.${index}.${fext}`
  const blobFile = new File([blob], blobName)

  const formData = new FormData()
  formData.append('file', blobFile)
  http
    .upload('/api/upload/slice', formData,)
    .then(res => {
      console.log(res)
      state.percentage = (start / file.size) * 100
      index += 1
      // 递归分片上传
      setTimeout(() => submitUpload(index), 200)
    })

  function merge(name: string) {
    http.post('/api/upload/merge', { name }).then(res => {
      console.log(res)
    })
  }
}
</script>
