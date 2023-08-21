<template>
  <main class="w-full h-full p-5">
    <div ref="containerRef" class="container"></div>
    <el-button @click="() => {
      loadMore()
      loadMore()
      loadMore()
      loadMore()
      loadMore()
    }
      ">load more</el-button>
  </main>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import useEvent from '@/hooks/useEvent'
import { http } from '@/http'
const containerRef = ref<HTMLDivElement>()

let loadMore = null
onMounted(() => {

  http.get<any>('/api/patch/patchList')
    .then((res) => {
      console.log(`res ==>`, res);
      createImgs(res.data)

    })
  /**
   * 每张图片的固定宽度
   */
  const img_width = 300

  /**
   * 加入图片元素
   */
  const createImgs = (data:any[] ) => {
    for (let i = 0; i < data.length; i++) {
      let src = `${import.meta.env.VITE_BASE_URL}/download/hotPic/${data[i]}`
      const img = document.createElement('img')
      img.src = src
      img.style.position = 'absolute'
      img.width = img_width
      /**每一张图片加载完就设置位置 */
      img.onload = setPosition
      containerRef.value.appendChild(img)
    }
  }
  loadMore = createImgs

  /**
   * 计算一共多少列 以及计算每一列之间的间隔
   */
  const calc = () => {
    /**容器宽度 */
    const container_width = containerRef.value.clientWidth
    /**列数量 */
    const columns = Math.floor(container_width / img_width)
    /**间隔数量 */
    const space_number = columns + 1
    /**剩余空间 */
    const left_space = container_width - columns * img_width
    /**间隔 */
    const space = left_space / space_number

    return {
      space,
      columns,
    }
  }

  /**
   * 设置每张图片的位置
   */
  const setPosition = () => {
    const { space, columns } = calc()
    /**该数组的长度为列数(columns),每一项表示该列的下一个图片的纵坐标 */
    const next_stop = new Array(columns)
    /**将数组的每一项填充0 */
    next_stop.fill(0)

    // for (let i = 0; i < containerRef.value.children.length; i++) {}

    for (const item of containerRef.value.children) {
      /**找到 next_stop 中的最小值作为当前图片的纵坐标 */
      const min_top = Math.min.apply(null, next_stop)
      console.log(`min_top ==>`, min_top)
      const img = item as HTMLDivElement
      img.style.top = min_top + 'px'
      /**重新设置数组这一项的下一个top值 */
      const index = next_stop.indexOf(min_top) /**得到使用的是第几列的top值 */
      next_stop[index] += img.height + space
      /**计算横坐标 */
      const left = (index + 1) * space + index * img_width
      img.style.left = left + 'px'
    }
    /**得到 next_stop 中的最大值 */
    const max = Math.max.apply(null, next_stop)
    /**设置容器的高度 */
    containerRef.value.style.height = max + 'px'
  }


  // window.onload=setPositions;
  // 定时器
  let timer = null
  // 窗口尺寸变动后，重新排列
  window.onresize = function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(setPosition, 100)
  }
})
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  width: 100%;
  position: relative;
}

.container img {
  position: absolute !important;
  transition: 0.3s;
}
</style>
