<template>
  <div>
    <pre class="cursor-pointer" data-copy-clipboard-button-label="复制"><code
      data-copy-clipboard-button-label="复制" contenteditable="true" :class="classNames">{{ html }}</code></pre>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    html: string
    theme?: string
    language?: string
  }>(),
  {
    language: 'javascript',
  },
)
const classNames = computed(() => {
  return `language-${props.language} line-numbers`
})
onMounted(() => {})
</script>
<style lang="scss" scoped></style>
