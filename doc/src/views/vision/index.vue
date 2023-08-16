<template>
  <main class="w-screen h-screen overflow-auto">
    <div v-for="item in 5">
      <div
        class="parallax flex items-center justify-center text-[50px] text-white"
        :style="`background-image:url(http://192.168.5.240:2333/download/hotPic/${item}.jpg)`">
        <div class="">dengta</div>
      </div>
      <div class="content">
        <h3>填充内容</h3>
        <p>填充内容ssssssssss</p>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
main {
  &::-webkit-scrollbar {
    width: 0;
  }
}
.parallax {
  width: 100%;
  height: 90vh;
  position: relative;
  overflow: hidden;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  // background-attachment: fixed;
}
.fixed-bg {
  background-attachment: fixed;
}
.scroll-bg {
  background-attachment: scroll;
}
.content {
  width: 100%;
  height: 40vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  text-align: justify;
  background-color: #000;
  justify-content: center;
  flex-direction: column;
}
h3 {
  font-style: 45px;
  letter-spacing: 10px;
  text-align: center;
  color: white;
  font-weight: 400;
}
p {
  color: #eee;
  font-style: 16px;
  line-height: 28px;
}
</style>
