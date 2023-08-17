<template>
  <main class="w-screen h-screen p-5 bg-[#cccc]" style="background-image: none">
    <div class="box1 cursor-pointer m-3 flex items-center justify-center text-gray-400 select-none">box1</div>
    <div class="box2 cursor-pointer m-3 flex items-center justify-center text-gray-400 select-none">box2</div>
    <div class="box3 cursor-pointer m-3 flex items-center justify-center text-gray-400 select-none">box3</div>
  </main>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.box1 {
  width: 150px;
  height: 150px;
  position: relative;
  border-radius: 50%;
  background: #eee;
  transition: all ease 0.3s;
  box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.5), inset 0 -3px 4px -1px rgba(0, 0, 0, 0.2),
    0 -10px 15px -1px rgba(255, 255, 255, 0.6), inset 0 3px 4px -1px rgba(255, 255, 255, 0.2),
    inset 0 0 5px 1px rgba(255, 255, 255, 0.8), inset 0 20px 30px 0 rgba(255, 255, 255, 0.2);
  &:active {
    transition: all ease 0.3s;
    box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.4), inset 0 -8px 30px 1px rgba(255, 255, 255, 0.9),
      0 -10px 15px -1px rgba(255, 255, 255, 0.6), inset 0 8px 25px 0 rgba(0, 0, 0, 0.4),
      inset 0 0 10px 1px rgba(255, 255, 255, 0.6);
  }
}

.box2 {
  width: 150px;
  height: 150px;
  position: relative;
  border-radius: 50%;
  background: #eee;
  transition: all ease 0.3s;
  box-shadow: #d6d6e7 0 3px 7px inset;
  &:active {
    transition: all ease 0.3s;
    box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.4), inset 0 -8px 30px 1px rgba(255, 255, 255, 0.9),
      0 -10px 15px -1px rgba(255, 255, 255, 0.6), inset 0 8px 25px 0 rgba(0, 0, 0, 0.4),
      inset 0 0 10px 1px rgba(255, 255, 255, 0.6);
    transform: translateY(2px);
  }
}

.box3 {
  width: 150px;
  height: 150px;
  position: relative;
  border-radius: 50%;
  background: #eee;
  transition: all ease 0.3s;
  box-shadow: #d6d6e7 0 3px 7px inset;
  &:active {
    transition: all ease 0.3s;
    box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2), inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
      -0.5px -0.5px 0px rgba(255, 255, 255, 1), 0.5px 0.5px 0px rgba(0, 0, 0, 0.15),
      0px 12px 10px -10px rgba(0, 0, 0, 0.05);
    // border: 1px solid rgba(0, 0, 0, 0.1);
    transform: translateY(0.5em);
  }
}
</style>
