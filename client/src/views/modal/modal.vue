<template>
  <main>
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="modalOpen" class="modal overflow-hidden">
          <div class="modal-body" ref="modalRef">
            这是一个模态框
            <el-button @click="modalOpen = false">关闭弹窗</el-button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script lang="ts" setup>
const modalOpen = ref(false)
const modalRef = ref()
import { onClickOutside } from '@vueuse/core'
onClickOutside(modalRef, () => {
  modalOpen.value = false
})

const open = () => (modalOpen.value = true)
defineExpose({ open })
</script>
<style lang="scss" scoped>
.modal {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  background: #fff;
  padding: 50px 100px;
  border-radius: 10px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
}

.modal-enter-active,
.modal-leave-active {
  opacity: 1;
  transition: all 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
