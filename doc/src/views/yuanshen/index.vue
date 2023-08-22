<script setup>
// IMAGE DATA
const ysImage = ref([
  {
    backgroundImage: 'https://ys.mihoyo.com/main/_nuxt/img/5c125a1.png',
  },
  {
    backgroundImage: 'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921550320292.jpg',
  },
  {
    backgroundImage: 'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921552395638.jpg',
  },
  {
    backgroundImage: 'https://uploadstatic.mihoyo.com/contentweb/20210719/2021071918001232800.jpg',
  },
  {
    backgroundImage:
      'https://webstatic.mihoyo.com/upload/contentweb/2022/08/15/8969f683b92839ac427c875d0d742be2_4825576482548821743.jpg',
  },
])

const asideData = ref([
  {
    title: '蒙德',
  },
  {
    title: '璃月',
  },
  {
    title: '稻妻',
  },
  {
    title: '须弥',
  },
  {
    title: '枫丹',
  },
])
// ELEMENT
const element = ref('element')
watchEffect(() => {
  if (element.value.style) {
    element.value.style.transform = transformScroll.value
  }
})

//HEIGHT
const { height } = useWindowSize()
const windowHeight = computed(() => {
  // 高度变化时需要关闭动画
  isTranstion.value = true
  return height.value
})
const transformScroll = computed(() => {
  return `translateY(-${$index.value * windowHeight.value}px)`
})

// ISTRANSTION  CANRUN
const isTranstion = ref(false) //控制是否显示动画效果
const canRun = ref(true) //节流控制器

function mousewheel(e) {
  isTranstion.value = false
  if (canRun.value) {
    canRun.value = false
    goScroll(e)
    setTimeout(() => {
      canRun.value = true
    }, 500)
  }
}

function goScroll(e) {
  //e.wheelDelta 用来判断上一个下一个 <0 下一个 >0上一个
  if (e.wheelDelta < 0) {
    next()
  } else {
    last()
  }
}

//$INDEX
const $index = ref(0) //索引控制第几个显示
// 下一个
function next() {
  if ($index.value < 4) {
    $index.value++
  }
}
// 上一个
function last() {
  if ($index.value > 1 || $index.value === 1) {
    $index.value--
  }
}

// 点击切换
function changeBac(index) {
  // 点击切换时需要开启动画
  isTranstion.value = false
  $index.value = index
}
</script>
<template>
  <!-- 最外层容器 -->
  <main class="outer-box" ref="fullPage">
    <!-- 内层容器 -->
    <div ref="element" :class="{ activeTranstion: isTranstion }" class="inner-box" @mousewheel="mousewheel">
      <!-- 滚动显示的元素 -->
      <div
        v-for="item in ysImage"
        :style="{ backgroundImage: `url(${item.backgroundImage})` }"
        class="scroll-element"
      ></div>
    </div>
    <!-- 指示器 -->
    <ul class="aside">
      <li v-for="(item, index) in asideData" @click="changeBac(index)">
        <span :class="{ active: index === $index }"></span>
        <div class="show-dec">{{ item.title }}</div>
      </li>
    </ul>
  </main>
</template>
<style lang="scss" scoped>
.activeTranstion {
  transition: all 0ms ease 0s !important;
}
.active {
  width: 12px !important;
  height: 12px !important;
}
.outer-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  .inner-box {
    width: 100%;
    height: 100%;
    transition: all ease-in-out 1s;
    .scroll-element {
      height: 100%;
      background-size: cover !important;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .aside {
    list-style: none;
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    li {
      height: 14px;
      width: 14px;
      margin: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .show-dec {
        position: absolute;
        font-size: 10px;
        width: 45px;
        right: 20px;
        opacity: 0;
        color: #fff;
        transition: all linear 0.1s;
      }
      span {
        border-radius: 100%;
        border: #fff solid 1px;
        width: 4px;
        height: 4px;
        display: inline-block;
        background-color: #fff;
        transition: all ease-in-out 0.2s;
      }
      &:hover span {
        width: 10px;
        height: 10px;
        background-color: #fff;
        cursor: pointer;
      }
      &:hover .show-dec {
        opacity: 1;
      }
    }
  }
}
</style>

