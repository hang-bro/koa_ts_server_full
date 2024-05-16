<template>
  <el-dialog :modelValue="show" title="Tips" width="900" :before-close="cancel">
    <section>
      <Code :html="getRaw(codePath)" />
    </section>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import Code from '@/components/code/index.vue'
type IProps = {
  show: boolean
  codePath: string
}
defineProps<IProps>()
const getRaw = (codePath: string) => {
  const allFiles = import.meta.glob('@/**/*.{!.d.ts.ts,js,vue,tsx,jsx,css,less,scss,}', { eager: true })
  console.log(`allFiles ==>`, allFiles)
  // return allFiles[codePath]
  return ''
}
const emit = defineEmits(['update:show'])

const cancel = () => {
  emit('update:show', false)
}
</script>
<style lang="scss" scoped></style>
