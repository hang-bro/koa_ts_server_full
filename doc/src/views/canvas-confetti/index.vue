<template>
  <main class="w-full h-full p-5">
    <div class="flex flex-wrap flex-col gap-5">
      <el-button type="primary" class="ml-3" plain @click="test1"> Basic Cannon </el-button>
      <el-button type="primary" plain @click="test2"> Random Direction </el-button>
      <el-button type="primary" plain @click="test3"> Realistic Look </el-button>
      <el-button type="primary" plain @click="test4"> Stars </el-button>
      <el-button type="primary" plain @click="test5"> Fireworks </el-button>
      <el-button type="primary" plain @click="test6"> Snow </el-button>
      <el-button type="primary" plain @click="test7"> School Pride </el-button>
    </div>
  </main>
</template>
<script lang="ts" setup>
import confetti from 'canvas-confetti'

const test1 = () => {
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.8 },
  })
}
const test2 = () => {
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
  })
}
const test3 = () => {
  var count = 200
  var defaults = {
    origin: { y: 0.7 },
  }

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      }),
    )
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
}
const test4 = () => {
  var defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ['star'],
    colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8'],
  }

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'],
    })

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle'],
    })
  }

  setTimeout(shoot, 0)
  setTimeout(shoot, 100)
  setTimeout(shoot, 200)
}
const test5 = () => {
  var duration = 15 * 1000
  var animationEnd = Date.now() + duration
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    var particleCount = 50 * (timeLeft / duration)
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }),
    )
    confetti(
      Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }),
    )
  }, 250)
}
const test6 = () => {
  var duration = 15 * 1000
  var animationEnd = Date.now() + duration
  var skew = 1

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  ;(function frame() {
    var timeLeft = animationEnd - Date.now()
    var ticks = Math.max(200, 500 * (timeLeft / duration))
    skew = Math.max(0.8, skew - 0.001)

    confetti({
      particleCount: 1,
      startVelocity: 0,
      ticks: ticks,
      origin: {
        x: Math.random(),
        // since particles fall down, skew start toward the top
        y: Math.random() * skew - 0.2,
      },
      colors: ['#ffffff'],
      shapes: ['circle'],
      gravity: randomInRange(0.4, 0.6),
      scalar: randomInRange(0.4, 1),
      drift: randomInRange(-0.4, 0.4),
    })

    if (timeLeft > 0) {
      requestAnimationFrame(frame)
    }
  })()
}
const test7 = () => {
  var end = Date.now() + 15 * 1000

  // go Buckeyes!
  var colors = ['#bb0000', '#ffffff']

  ;(function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}
</script>
<style lang="scss" scoped></style>
