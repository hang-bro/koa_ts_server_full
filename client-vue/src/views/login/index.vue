<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-08 10:52:05
-->
<template>
  <main class="w-screen h-screen flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <el-form
        status-icon
        size="large"
        ref="formRef"
        label-position="top"
        :model="loginForm"
        :rules="rules"
        class="bg-white/40 rounded-2xl shadow-2xl p-7 pt-10">
        <el-form-item>
          <div class="w-full font-bold text-[30px] text-center text-bg">登 录</div>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="loginForm.email" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="loginForm.password" type="password" />
        </el-form-item>
        <el-form-item class="captcha" prop="captcha" label="验证码">
          <el-input v-model="loginForm.captcha" placeholder="请输入">
            <template #append>
              <img
                style="width: 150px"
                :src="getCaptchaUrl"
                alt=""
                @click="(e:any)=>e.target.src = getCaptchaUrl + `?timeStamp=${Date.now()}`" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="flex w-full justify-between">
            <div><input type="checkbox" :checked="checked" /><span class="ml-2">记住密码</span></div>
            <a href="#resetPwd" class="text-[#1e80ff] font-bold">忘记密码?</a>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="w-full !text-lg" color="#626aef" @click="login">login</el-button>
        </el-form-item>
        <el-form-item>
          <div class="text-sm text-gray-500">
            没有账号?
            <a href="#regist" class="font-semibold leading-6 text-indigo-600"> 点击注册 </a>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </main>
</template>
<script setup lang="ts">
import useKeyDown from '@/hooks/useKeyDown'
import useValidate from '@/hooks/useValidate'
import { http } from '@/http'
import userStore from '@/store/user'
import { FormInstance } from 'element-plus'
import { useRouter } from 'vue-router'
const store = userStore()
const router = useRouter()
const getCaptchaUrl = ref(import.meta.env.VITE_BASE_URL + import.meta.env.VITE_BASE_API + '/login/captcha')
const formRef = ref<FormInstance>()

const loginForm = reactive({
  email: '',
  password: '',
  captcha: '',
})

const rules = reactive<any>({
  email: useValidate.email,
  password: useValidate.password,
  captcha: useValidate.pleaseInput,
})

const checked = ref(true)

const login = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      http.post<{ token: string }>('/login', loginForm).then((res) => {
        const { data } = res
        store.setToken(data.token)
        http.get<UserInfo>('/login/getInfo').then((res) => {
          console.log(`res ==>`, JSON.parse(JSON.stringify(res)))
          store.setInfo(res.data)
          router.push({ name: 'dashboard', replace: true })
        })
      })
    }
  })
}

useKeyDown((e) => {
  e.key == 'Enter' && login()
})

onMounted(() => {})
</script>

<style lang="scss" scoped>
:deep(.captcha) {
  cursor: pointer;
  .el-form-item__content {
    .el-input-group__append {
      padding: 0;
    }
  }
}
</style>
