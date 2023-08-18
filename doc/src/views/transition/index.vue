<template>
  <main>
    <el-button @click="count += 1">+1</el-button>

    <Transition mode="out-in">
      <div :key="count">
        {{ count }}
      </div>
    </Transition>
  </main>
</template>
<script setup lang="ts">
const count = ref(0)
</script>
<style lang="css" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s;
}

.v-enter-from,
.v-leave-to {
  opacity: 1;
 
}
</style>
