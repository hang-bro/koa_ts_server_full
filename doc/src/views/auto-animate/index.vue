<script setup lang="ts">
import { ref } from 'vue'
/****************************************************************************************** */
const numbers = ref<number[]>(new Array(50).fill('').map((_, i) => i))
const randomize = () => numbers.value.sort(() => (Math.random() > 0.5 ? 1 : -1))
/****************************************************************************************** */
const faq = ref([
  {
    id: 'why',
    question: 'Why did you create it?',
    answer: `We needed a way to animate DOM elements without adding to the
    virtual DOM in Vue and React. And it turned out our solution was gonna work
    great for lots of other use cases as well.`,
  },
  {
    id: 'license',
    question: 'Is it open source?',
    answer: `It sure is! AutoAnimate is MIT licensed, which basically means you
    are free to take it and do whatever you want with it. If you find it useful
    consider <a href="https://github.com/sponsors/formkit">supporting our open source efforts</a>.`,
  },
  {
    id: 'who',
    question: 'Who made this?',
    answer: `AutoAnimate is a team effort 💪 . Most of the code was written by
      <a href='https://twitter.com/jpschroeder'>Justin Schroeder</a>,
      <a href='https://twitter.com/0xBOYD'>Andrew Boyd</a> played a key
      role on the docs, and the rest of the <a href='https://formkit.com'>FormKit</a>
      team held down the fort.`,
  },
])

const current = ref(faq.value[0].id)
/****************************************************************************************** */
/****************************************************************************************** */
const numbers3 = ref<number[]>(new Array(10).fill('').map((_, i) => i))
const randomize3 = () => numbers3.value.sort(() => (Math.random() > 0.5 ? 1 : -1))
/****************************************************************************************** */
</script>

<template>
  <main class="w-screen h-screen overflow-auto">
    <section>
      <h1 class="font-bold text-2xl m-2">示例一</h1>
      <div class="flex items-center flex-wrap" v-auto-animate="{ duration: 500 }">
        <div
          class="border-success border w-[10%] m-[5px] aspect-square flex items-center justify-center"
          v-for="number in numbers"
          :key="number"
          v-text="number" />
      </div>
      <el-button class="t" @click="randomize">Randomize</el-button>
    </section>

    <section>
      <h1 class="font-bold text-2xl m-2">示例二</h1>
      <ul>
        <li v-for="q in faq" :key="q.id" v-auto-animate>
          <!-- @vue-skip -->
          <div class="question" @click="current = current === q.id ? false : q.id">
            {{ q.question }}
          </div>
          <p class="p-4 bg-purple-200" v-if="q.id === current" v-html="q.answer" />
        </li>
      </ul>
    </section>
    <section>
      <h1 class="font-bold text-2xl m-2">示例三</h1>
      <div class="flex items-center flex-wrap" v-auto-animate="{ duration: 500 }">
        <div
          class="box1 cursor-pointer m-3 flex items-center justify-center text-gray-400"
          v-for="number in numbers3"
          :key="number"
          v-text="number" />
      </div>
      <el-button class="t" @click="randomize3">Randomize</el-button>
    </section>
  </main>
</template>

<style scoped lang="scss">
section {
  margin-bottom: 50px;
  border: 2px dashed #ccc;
  padding: 15px;
  margin: 20px;
  border-radius: 8px;
}
.question {
  padding: 1em;
  display: flex;
  align-items: center;
  cursor: pointer;
  &::before {
    content: 'FAQ';
    font-size: 20px;
    margin-right: 10px;
    color: var(--primary);
  }
}
.box1 {
  width: 150px;
  height: 150px;
  position: relative;
  border-radius: 50%;
  background: #fff;
  transition: all ease 0.3s;
  box-shadow: 0 15px 25px -4px rgba(84, 81, 81, 0.5), inset 0 -3px 4px -1px rgba(0, 0, 0, 0.2),
    0 -10px 15px -1px rgba(255, 255, 255, 0.6), inset 0 3px 4px -1px rgba(255, 255, 255, 0.2),
    inset 0 0 5px 1px rgba(255, 255, 255, 0.8), inset 0 20px 30px 0 rgba(255, 255, 255, 0.2);
  &:active {
    transition: all ease 0.3s;
    box-shadow: 0 12px 25px -4px rgba(106, 101, 101, 0.4), inset 0 -8px 30px 1px rgba(255, 255, 255, 0.9),
      0 -10px 15px -1px rgba(255, 255, 255, 0.6), inset 0 8px 25px 0 rgba(0, 0, 0, 0.4),
      inset 0 0 10px 1px rgba(255, 255, 255, 0.6);
  }
}
</style>
