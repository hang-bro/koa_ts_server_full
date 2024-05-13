<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-13 16:04:52
-->

<template>
  <div class="w-full flex flex-wrap">
    <el-upload
      :class="{ disabled: fileList.length == limit }"
      :headers="{
        ['authorization']: useStore((store) => store.user.token),
      }"
      list-type="picture-card"
      :on-success="(e) => emit('success', e)"
      :on-remove="(e) => emit('remove', e)"
      :action="action"
      v-model:file-list="fileList"
      :limit="limit"
      accept="image/*">
      <el-icon><Plus /></el-icon>
    </el-upload>
  </div>
</template>
<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import { useStore } from '@/hooks/useStore'
import { uploadActions } from '@/http/axios'

const fileList = ref([])

interface IProps {
  /**上传地址 */
  action?: string
  /**limit */
  limit?: number
}
const props = withDefaults(defineProps<IProps>(), {
  action: uploadActions.singleImage,
  limit: 1,
})

const setFiles = (list: any[]) => {
  fileList.value = list
}

defineExpose({
  setFiles,
})

const emit = defineEmits(['success', 'remove'])
</script>
<style lang="scss" scoped>
//隐藏图片上传框的css

:deep(.disabled) {
  .el-upload--picture-card {
    display: none;
  }
}
</style>
