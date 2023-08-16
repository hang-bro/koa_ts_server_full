<!--
 * @Description: 
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-07-13 13:13:38
-->
<template>
  <div class='content'>
    <div class='box'>
      <div class='circleOuter' />
      <svg>
        <defs>
          <radialGradient id="gradient" cx="50%" cy="50%" r="60%" fx="50%" fy="50%">
            <stop offset="30%" stopColor="#3cba92" />
            <stop offset="100%" stopColor="#c1dfc4" />
          </radialGradient>
        </defs>
        <circle stroke="rgba(151, 211, 180,0.7)" id="circle"></circle>
      </svg>
      <div class="num">{{ `${Math.floor(progress)}%` }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import './index.scss'
function randomColor() {
    const r = randomInt(255)
    const g = randomInt(255)
    const b = randomInt(255)
    const c = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}000`
    return c.slice(0, 7)
}

function randomInt(max) {
    return Math.floor(Math.random() * max)
}

const speed = 0.2;
const progress = ref<number>(0);
const setProgress = (value: number) => { progress.value = value }

const play = () => {
  let perimeter = 3.14 * 150; //这是stroke-dashoffset的值
  const circle = document.getElementById("circle");
  if (progress.value >= 100) {
    progress.value = 0;
    setProgress(0);
    const circle = document.getElementById("circle");
    if (circle) {
      circle.style.strokeDashoffset = `${perimeter.toString()}`;
    }
  } else {
    progress.value = Number((progress.value + speed).toFixed(2));
    setProgress(Number((progress.value + speed).toFixed(2)));
    perimeter = Math.floor(perimeter - (perimeter * progress.value) / 100);
    if (circle) {
      circle.style.strokeDashoffset = `${perimeter.toString()}`;
    }
  }
  window.requestAnimationFrame(play);
};

onMounted(() => {
  play();

  // return () => {
  //   frameId.value && cancelAnimationFrame(frameId.value);
  // };
});
</script>
<style lang="scss" scoped></style>