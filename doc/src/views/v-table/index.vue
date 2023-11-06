<template>
  <main class="w-full h-full p-7 bg-none">
    <el-button @click="test">测试</el-button>
    <v-list
      @rowSelect="rowSelect"
      :list-data="listData"
      :prop="{
        header: [
          { name: '序号', prop: 'index1' },
          { name: '序列号', prop: 'index2' },
          { name: '出库情况', prop: 'index3' },
          { name: '上架情况', prop: 'index4' },
          {
            name: '操作',
            prop: [
              {
                name: '删除',
                style: 'color:red;',
                click: (e) => {
                  console.log(`删除 ==>`, e)
                },
              },
              {
                name: '修改',
                style: 'color:orange;',
                click: (e) => {
                  console.log(`修改 ==>`, e)
                },
              },
            ],
          },
        ],
      }"
      :view-count="30">
    </v-list>
  </main>
</template>

<script>
import VList from './v-list.vue'
export default {
  components: { VList },
  data() {
    return {
      listData: 'title',
      listData: [],
    }
  },
  methods: {
    test(e) {
      this.listData = new Array(1000).fill(null).map((item, index) => {
        return {
          index1: index,
          index2: '2',
          index3: '未出库',
          index4: '已上架',
          index5: '删除',
          index,
          check: false,
        }
      }) 
    },
    rowSelect(data) {
      console.log(`data ==>`, data)
    },
  },
}
</script>
<style lang="scss" scoped>
::deep(.el-table__empty-block) {
  width: 0;
  height: 0;
  display: none;
}
</style>
