<template>
  <main class="w-full h-full p-5">
    <el-button>js-this</el-button>
  </main>
</template>
<script lang="ts" setup>
function foo() {
  console.log(this.age)
}
var shiny = {
  age: 20,
}
foo.call(shiny) //20

function bar() {
  console.log(this.age)
}
var red = {
  age: 18,
}
bar.apply(red) //18
</script>
<style lang="scss" scoped></style>
