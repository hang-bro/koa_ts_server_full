<template>
  <div
    :class="{
      'h-[25px]': size == 'mini',
      'h-[30px]': size == 'small',
      'h-[35px]': size == 'md',
      'h-[40px]': size == 'large',
    }"
    class="flex flex-row items-center justify-center flex-nowrapm-auto rounded w-full shadow overflow-hidden cursor-pointer">
    <div
      :style="{ lineHeight }"
      class="indent-3 text-center text-white flex-1 h-full overflow-hidden text-ellipsis whitespace-nowrap bg-teal-500">
      {{ value }}
    </div>
    <div @click="useCopy(props.value)" class="bg-teal-600 p-1 w-8 h-full flex items-center justify-center">
      <CopyIcon theme="outline" :size="iconSize" fill="#fff" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import useCopy from '@/hooks/useCopy'
const props = withDefaults(defineProps<{ value?: string; size?: 'mini' | 'small' | 'md' | 'large' }>(), {
  value: 'copy',
  size: 'md',
})
import { Copy as CopyIcon } from '@icon-park/vue-next'

const iconSize = computed(() => {
  switch (props.size) {
    case 'mini':
      return 16
    case 'small':
      return 18
    case 'md':
      return 20
    case 'large':
      return 22

    default:
      return 16
  }
})

const lineHeight = computed(() => {
  switch (props.size) {
    case 'mini':
      return '25px'
    case 'small':
      return '30px'
    case 'md':
      return '35px'
    case 'large':
      return '40px'
  }
})
</script>
<style lang="scss" scoped></style>
