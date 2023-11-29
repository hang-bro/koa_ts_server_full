<script setup lang="ts">
const user = {
  name: 'hang-bro',
  age: 24,
}

// @ts-ignore
const hi = tag`my name is ${user.name},I'm ${user.age}`
console.log(`hi ==>`, hi)

function tag() {
  console.log(`arguments ==>`, arguments)
}
</script>

<template>
  <main class="w-full h-full p-5">

  <div>
    <ul>
      <li class="a10"></li>
      <li class="a20"></li>
      <li class="a30"></li>
      <li class="a40"></li>
      <li class="a50"></li>
      <li class="a60"></li>
    </ul>
  </div>
  </main>
</template>
