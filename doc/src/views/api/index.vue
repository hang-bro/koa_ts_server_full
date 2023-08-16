<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-05 15:39:22
-->
<template>
  <main class="w-full h-full overflow-auto p-5">
    <ul
      class="bg-white flex flex-col flex-wrap bg-base-200 my-8 first:mt-0 rounded-lg overflow-hidden shadow-xl"
      v-for="(item, key) of apis"
      :key="key">
      <li class="flex items-center cursor-pointer text-xl p-3 pl-6 !font-bold">
        <span> {{ key.toString().slice(5).length > 1 ? key.toString().slice(5) : key }}</span>
        <span class="mx-3 bg-green-500 rounded-full flex items-center justify-center w-5 h-5 text-sm">
          {{ item.length }}
        </span>
      </li>
      <li
        v-for="(api, index) in item"
        :key="index"
        class="cursor-pointer items-start p-[8px] pl-6 last:pb-3 transition api-hover">
        <div>
          <span
            class="font-bold text-xl uppercase"
            :class="{
              'text-red-700': api.method === 'delete',
              'text-orange-500': api.method === 'post',
              'text-green-500': api.method === 'get',
              'text-blue-600': api.method === 'put',
            }">
            {{ api.method }}
          </span>
          <span class="mx-4 hover:font-bold" v-copy="baseUrl + api.url"> {{ api.url }}</span>
          <span class="text-gray-600">{{ api.description }}</span>
        </div>
      </li>
    </ul>
  </main>
</template>
<script setup lang="ts">
import { http } from '@/http'
type IApi = {
  [props: string]: {
    /**前缀 */
    prefix: string
    /**接口地址 */
    url: string
    /**接口方法 */
    method: 'post' | 'get' | 'put' | 'delete'
    /**接口描述 */
    description: string
    /**类（controller）描述 */
    classDes: string
  }[]
}

const baseUrl = import.meta.env.VITE_BASE_URL
const apis = reactive<IApi>({})
const { data } = await http.get<IApi>('/api/apis')
data &&
  Object.keys(data).forEach((key) => {
    apis[key] = data[key]
  })
</script>

<style lang="scss" scoped>
.api-hover {
  &:hover {
    background-image: linear-gradient(120deg, #e7ddf1 0%, #c8dcf1 100%);
  }
}
</style>
