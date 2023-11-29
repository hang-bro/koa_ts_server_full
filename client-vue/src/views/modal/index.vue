<template>
  <main>
    <el-button @click="t">点击打开loading </el-button>
    <Modal ref="modalRef" />
  </main>
</template>
<script setup lang="ts">
import useLoading, { loading } from '@/components/loading'
import Modal from './modal.vue'

const modalRef = ref()
const t = async () => {
  // const loadings = await useLoading()
  // const name = loadings[Math.floor(Math.random() * loadings.length)].name
  // console.log(` modalRef.value ==>`, modalRef.value.open(name))
  const { open, close } = await loading()
  open()
}
</script>
<style lang="css" scoped></style>
