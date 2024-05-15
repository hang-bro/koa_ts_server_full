<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-08 20:57:13
-->
<template>
  <main class=" w-screen h-screen flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <el-form
        status-icon
        size="large"
        ref="formRef"
        label-position="top"
        :model="form"
        :rules="rules"
        class="bg-white/40 rounded-2xl shadow-2xl p-7 pt-10">
        <el-form-item> <div class="w-full font-bold text-[30px] text-center text-bg">重 置</div> </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item class="code" prop="code" label="验证码">
          <el-input v-model="form.code" placeholder="请输入">
            <template #append>
              <el-button class="btn rounded-none" @click="sendEmailCode" :disabled="state.btnDisabled">
                {{ state.btnName }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="w-full !text-lg" color="#626aef" @click="reset">reset</el-button>
        </el-form-item>
        <el-form-item>
          <div class="text-sm text-gray-500">
            已有账号?
            <a href="#login" class="font-semibold leading-6 text-indigo-600"> 点击登录 </a>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </main>
</template>
<script setup lang="ts">
import useValidate from '@/hooks/useValidate'
import { http } from '@/http'
import { ElMessage, FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const formRef = ref<FormInstance>()

const form = reactive({
  code: '',
  email: '',
  password: '',
})
const rules = reactive<any>({
  email: useValidate.email,
  password: useValidate.password,
  code: useValidate.pleaseInput,
})
const state = reactive({
  btnName: '发送验证码',
  btnDisabled: false,
  leftTime: 60,
})

const sendEmailCode = async () => {
  try {
    await formRef.value.validateField('email')
  } catch (error) {
    return ElMessage.error('请填写并填写正确的邮箱!')
  }
  state.btnName = '发送中...'
  state.btnDisabled = true
  http.post<UserModel>('/user/getEmailCode', { email: form.email }).then((res) => {
    const { code, message } = res
    if (code === 200) {
      ElMessage.success(message)
      codeTimer()
    } else {
      state.btnName = '发送验证码'
      state.btnDisabled = false
    }
  })
}

function codeTimer() {
  state.btnName = '获取验证码'
  if (state.leftTime >= 1) {
    state.btnDisabled = true
    state.btnName = state.leftTime + 's 后获取'
    state.leftTime -= 1
    setTimeout(function () {
      codeTimer()
    }, 1000)
  } else {
    state.btnName = '发送验证码'
    state.btnDisabled = false
    state.leftTime = 60
  }
}

const reset = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      http.post<UserModel>('/user/forgetPassword', form).then((res) => {
        const { code, message } = res
        if (code === 200) {
          ElMessage.success(message)
          router.push('/login')
        }
      })
    }
  })
}
</script>

<style lang="scss" scoped></style>
