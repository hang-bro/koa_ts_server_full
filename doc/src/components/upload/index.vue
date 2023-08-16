<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-13 16:04:52
-->

<template>
  <div class=" w-full  flex flex-wrap">
    <el-upload :on-success="handleAvatarSuccess" :on-progress="handleProgress" :action="action" :show-file-list="false">
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>
  </div>
</template>
<script lang="ts" setup>
import Progress from "@/components/progress/index.vue";
import { Plus } from '@element-plus/icons-vue'
import { UploadFile, UploadFiles, UploadProgressEvent, UploadProps } from 'element-plus/es/components/upload/src/upload';
const emit = defineEmits(['success',])
const action = import.meta.env.VITE_BASE_URL + '/api/upload'


const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  emit('success', response.data.data)
  const url = URL.createObjectURL(uploadFile.raw!)
}

const handleProgress = (evt: UploadProgressEvent, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  console.log(` ==>`, {
    evt,
    uploadFile,
    uploadFiles
  });
  console.log(` ==>`,evt.percent);
}
</script>
<style lang="scss" scoped></style>