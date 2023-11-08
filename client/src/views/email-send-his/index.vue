<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-18 10:16:15
-->
<template>
  <main class="w-full h-full">
    <CURD ref="CURDRef" :api="API">
      <template #search="{ getList, query }">
        <el-form-item>
          <el-input style="width: 200px" @keyup.enter="getList" placeholder="email" v-model="query.email" clearable />
        </el-form-item>
      </template>
      <template #table="{ handleDelete, viewImg, errorImg }">
        <el-table-column type="index" align="center" label="序号" width="70" />
        <el-table-column type="selection" align="center" width="55" />
        <el-table-column align="center" prop="email" label="email" />
        <el-table-column align="center" prop="regist_code" label="注册码" />
        <el-table-column align="center" prop="reset_password_code" label="重置码" />
        <el-table-column align="center" label="注册码发送时间" width="240">
          <template #default="{ row }">
            {{ dayjs(row.regist_code_time).format('YYYY-MM-DD HH:mm:ss') }}注册码发送时间注册码发送时间
          </template>
        </el-table-column>
        <el-table-column align="center" label="重置密码发送时间" width="240">
          <template #default="{ row }">
            重置密码发送时间  {{ row.reset_password_code_time && dayjs(row.reset_password_code_time).format('YYYY-MM-DD HH:mm:ss') }}
          </template>
        </el-table-column>
      </template>
    </CURD>
  </main>
</template>
<script lang="ts" setup>
import CURD from '@/components/CURD/index.vue'

const API = ref('/api/emailSendHis')

const CURDRef = ref()
</script>
<style lang="scss" scoped></style>
