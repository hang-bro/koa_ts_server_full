<template>
  <el-dialog
    :modelValue="show"
    :title="title"
    :width="width"
    :before-close="cancel"
    :close-on-click-modal="false"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="字符" prop="key">
        <el-input v-model="form.key" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number
          class="!w-full"
          v-model="form.sort"
          :precision="0"
          :min="1"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="form.remark" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">关闭</el-button>
        <el-button type="info" @click="resetForm(formRef)">清空</el-button>
        <el-button type="primary" @click="handleSubmit(formRef)"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'

import useValidate from '@/hooks/useValidate'
import { http } from '@/http'

export type IProps = {
  show: boolean
  type: 'add' | 'edit' | ''
  formData: Record<string, any>
  width?: number
}
const props = withDefaults(defineProps<IProps>(), {
  width: () => 500,
})

const formRef = ref<FormInstance>()

type IEmit = {
  (e: 'update:show', v: boolean)
  (e: 'getList')
}
const emit = defineEmits<IEmit>()

const cancel = () => emit('update:show', false)

const title = computed(() => {
  switch (props.type) {
    case 'add':
      return '新增'
    case 'edit':
      return '修改'
    default:
      return '标题'
  }
})

watch(
  () => props.show,
  (show) => {
    if (show) {
      nextTick(() => {
        resetForm(formRef.value)
        Object.keys(props.formData).forEach((key) => {
          form[key] = props.formData[key]
        })
      })
    }
  },
)

type IForm = {
  id?: number
  name: string
  key: string
  sort?: number
  remark?: string
}

const form = reactive<IForm>({
  id: null,
  name: null,
  key: null,
  sort: null,
  remark: null,
})
const rules = reactive({
  name: useValidate.pleaseInput,
  key: useValidate.pleaseInput,
  sort: useValidate.pleaseInput,
})

const handleSubmit = (formEl: FormInstance) => {
  formEl.validate((valid) => {
    if (valid) {
      const data = JSON.parse(JSON.stringify(form))
      const apiUrl = '/role'
      if (props.type == 'add') {
        http.post(apiUrl, data).then((res) => {
          ElMessage.success(res.message)
          emit('getList')
        })
      }

      if (props.type == 'edit') {
        http.patch(`${apiUrl}/${form.id}`, data).then((res) => {
          ElMessage.success(res.message)
          emit('getList')
        })
      }
    }
  })
}
</script>
<style lang="scss" scoped></style>
