<template>
  <main>
    <el-button @click="t">点击打开弹窗 </el-button>

    <Modal ref="modalRef" />
  </main>
</template>
<script setup lang="ts">
import Modal from './modal.vue'

const modalRef = ref()
const t=()=>{
 console.log(` modalRef.value ==>`, modalRef.value.open());
}
</script>
<style lang="css" scoped></style>
