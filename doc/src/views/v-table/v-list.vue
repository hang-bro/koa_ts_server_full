<template>
  <div>
    <div class="header">
      <el-checkbox style="margin-left: 5px" v-model="checkAll" />
      <div class="header-wrapper" :style="headerStyle">
        <div v-for="item in prop.header" :style="item.style" class="header-wrapper_item">{{ item.name }}</div>
      </div>
    </div>
    <div class="viewPort" ref="viewPort" :style="{ '--scroll-eight': rowHeight + 'px' }" @scroll="handleScroll">
      <div class="scrollBar" ref="scrollBar"></div>
      <div class="list" ref="list">
        <div class="row" ref="row" v-for="(item, index) in finalList" :key="index" @click="handleClick(item.index)">
          <!-- <el-checkbox style="margin-left: 5px" v-model="listData[item.index].check" @click="emitRowSelect" /> -->
          <!-- 表格选项 -->
          <div class="prop" v-for="_ in prop.header">
            <span v-if="Array.isArray(_.prop)" style="display: flex; justify-content: center">
              <div
                v-for="text in _.prop"
                @click="text.click(listData[item.index])"
                style="margin: 0 3px; cursor: pointer"
                :style="text.style">
                {{ text.name }}
              </div>
            </span>
            <span v-else>
              {{ listData[item.index][_.prop] }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkAll: false,
      startIndex: 0, // 开始索引默认为0
      endIndex: this.viewCount, // 结束索引为列表展示条数
    }
  },
  props: {
    prop: {
      type: Object,
      default: {},
    },
    showSelect: {
      type: Boolean,
      default: true,
    },
    // 行高
    rowHeight: {
      type: Number,
      default: 25,
    },
    // 显示条数
    viewCount: {
      type: Number,
      default: 20,
    },
    // 显示内容
    listItem: {
      type: String,
    },
    // 数据
    listData: {
      type: Array,
      required: true,
    },
  },
  watch: {
    checkAll: function (newV) {
      if (newV) {
        console.log(`newV ==>`, newV)
        this.listData.forEach((i) => (i.check = true))
        this.emitRowSelect()
      } else {
        this.listData.forEach((i) => (i.check = false))
        this.emitRowSelect()
      }
    },
  },
  computed: {
    headerStyle() {
      let width
      if (this.listData.length < 20) {
        width = 'calc(100% - 20px)'
      } else {
        width = 'calc(100% - 35px)'
      }
      return { width: width, marginLeft: !this.showSelect ? '14px' : '' }
    },
    finalList() {
      //   console.log(` ==>`, this.startIndex, this.endIndex)
      return this.listData.slice(this.startIndex, this.endIndex) // 展示的数据
    },
  },
  mounted() {
    this.$refs.viewPort.style.height = this.$refs.list.style.height = this.rowHeight * this.viewCount + 'px' // 视口高度动态赋值
    this.$refs.scrollBar.style.height = this.listData.length * this.rowHeight + 'px' // 滚动条高度动态赋值
  },
  methods: {
    emitRowSelect() {
      setTimeout(() => {
        this.$emit(
          'rowSelect',
          this.listData.filter((i) => i.check),
        )
      }, 100)
    },
    debounce(fn, time) {
      let timer = null
      if (timer) {
        clearInterval(timer)
      }
      timer = setTimeout(() => {
        fn()
      }, time || 500)
    },
    handleScroll() {
      this.startIndex = Math.round(this.$refs.viewPort.scrollTop / this.rowHeight) // 开始索引
      this.endIndex = this.startIndex + this.viewCount // 结束索引
      this.$refs.list.style.transform = `translateY(${this.startIndex * this.rowHeight}px)` // 向下平移
    },
    handleClick(e) {
      //   setTimeout(() => {
      //     console.log(`e ==>`, this.listData[e])
      //   }, 100)
    },
  },
}
</script>

<style scoped lang="scss">
.header {
  background-color: #eee;
  display: flex;
  &-wrapper {
    display: flex;
    // padding: 5px 0;
    &_item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
.viewPort {
  width: 100%;
  overflow-y: auto;
  position: relative;
  .list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .row {
      height: var(--scroll-eight);
      width: 100%;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      &:hover {
        background-color: #eee;
        color: #f0f;
      }
      &:active {
        background-color: #eee;
        color: #f0f;
      }
      .prop {
        flex: 1;
        text-align: center;
      }
    }
  }
}
</style>
