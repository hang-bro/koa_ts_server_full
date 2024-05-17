<template>
  <div>
    <pre class="cursor-pointer"><code
       contenteditable="true" :class="classNames">{{ html }}</code></pre>
  </div>
</template>
<script lang="ts" setup>
import prims from 'prismjs'
const props = withDefaults(
  defineProps<{
    html: string
    theme?: string
    language?: string
  }>(),
  {
    language: 'ts',
  },
)
const classNames = computed(() => {
  return `language-${props.language} line-numbers `
})
watch(
  () => props.html,
  (newCode) => {
    // console.log(`newCode ==>`, newCode)
  },
)
onMounted(() => {
  nextTick(() => {
    prims.highlightAll()
  })
})
</script>
<style lang="scss" scoped></style>
