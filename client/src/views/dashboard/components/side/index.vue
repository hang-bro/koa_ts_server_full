<template>
  <section class="w-[280px] no-scroll h-auto ml-3 hidden sm:block overflow-auto animate__animated animate__fadeInRight">
    <ScrollBox animate="bounceInUp" delay=".2s">
      <template #default="{ useRandomBg }">
        <div
          :style="useRandomBg()"
          @click="openGitHub(key)"
          class="p-5 py-10 bg-purple-100 m-2 cursor-pointer"
          v-for="(item, key) in packages.dependencies">
          {{ key }}:<span class="font-bold text-base ml-2 underline"> {{ item }}</span>
        </div>
      </template>
    </ScrollBox>
  </section>
</template>
<script lang="ts" setup>
import packages from '~/package.json'

function openGitHub(name: string) {
  name = name.replaceAll('@', '')
  name = name.split('/')[0]
  window.open(`https://github.com/search?q=${name}&type=repositories`)
}
</script>
<style lang="scss" scoped></style>
