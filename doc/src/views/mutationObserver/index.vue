<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

const container = ref()
const mutationObserver = ref()
const mockData = ref<any>([])

const desiredFunc = () => {
  console.log('children changed')
}

const connectMutationObserver = () => {
  mutationObserver.value = new MutationObserver(desiredFunc)

  mutationObserver.value.observe(container.value, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true,
  })
}

const disconnectMutationObserver = () => {
  mutationObserver.value.disconnect()
}

onMounted(async () => {
  connectMutationObserver()

  setTimeout(() => {
    mockData.value = [1, 2, 3]
  }, 5000)
})

onUnmounted(() => {
  disconnectMutationObserver()
})
</script>

<template>
  <div ref="container">
    <div v-for="child in mockData" :key="child">
      {{ child }}
    </div>
  </div>
</template>
