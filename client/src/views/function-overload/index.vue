<template>
  <main class="w-full h-full p-5">
    <h1 class="font-bold text-xl">函数重载</h1>
  </main>
</template>
<script lang="ts" setup>
const addMethod = (obj: object, name: string, fn: Function) => {
  console.log(`fn ==>`,fn.length);
  obj[name] = function (...args) {
    console.log(`args ==>`, args)
  }
  // console.log(` ==>`, {
  //   obj,
  //   name,
  //   fn,
  // })
}
const methods = {}
addMethod(methods, 'handle', () => {})
addMethod(methods, 'handle', (e1) => {})
addMethod(methods, 'handle', (e1, e2) => {})
addMethod(methods, 'handle', (e1, e2, e3) => {})
// methods.handle(1,2,3)
</script>
<style lang="scss" scoped></style>
