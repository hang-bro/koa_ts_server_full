<template>
  <el-dialog
    :modelValue="show"
    v-bind="dialogProps"
    align-center
    :before-close="close"
    modal-class="source-code-dialog">
    <template #title>
      <div>
        代码地址:<span class="font-bold ml-5">{{ codePath }}</span>
      </div>
    </template>
    <section class="code-area overflow-auto scroll1">
      <Code :html="getSourceCode()" />
    </section>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import Code from '@/components/code/index.vue'
import { IDialogProps } from '.'
const codePath = ref('')
const show = ref(false)
const dialogProps = ref<IDialogProps>({
  width: 900,
})

const getSourceCode = () => {
  const allFiles = import.meta.glob(['@/directives/**', '@/components/**'], {
    eager: true,
    as: 'raw',
  })
  console.log(`allFiles ==>`, allFiles)
  return allFiles[codePath.value] || '```代码地址不存在```'
}

const close = () => {
  show.value = false
}

const open = (_codePath: string, _dialogProps?: IDialogProps) => {
  codePath.value = _codePath
  if (_dialogProps) {
    dialogProps.value = {
      ...dialogProps.value,
      ..._dialogProps,
    }
  }
  show.value = true
}

defineExpose({
  close,
  open,
})
</script>
<style lang="scss">
.source-code-dialog {
  font-style: italic;
  .el-overlay-dialog {
    .el-dialog {
      .el-dialog__body {
        padding: 0 15px;
        font-size: 15px;
        .code-area {
          max-height: calc(100vh - 150px);
          overflow: auto;
        }
      }
    }
  }
}
</style>
