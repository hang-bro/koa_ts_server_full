<template>
  <main class="w-full h-full bg-none relative bg-black/30 flex justify-center items-center">
    <div class="cssload-loading">
      <div class="cssload-dot"></div>
      <div class="cssload-dot2"></div>
    </div>
  </main>
</template>
<script lang="ts">
export default {
  name: 'loading11',
}
</script>
<script lang="ts" setup></script>

<style type="text/css" scoped>
.cssload-loading {
  position: absolute;
  left: 50%;
  width: 19px;
  height: 19px;
  transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
}
.cssload-loading .cssload-dot {
  position: absolute;
  border-radius: 50%;
  left: 1px;
  top: 1px;
  width: 18px;
  height: 18px;
  background: rgb(0, 0, 0);
  animation: cssload-spin 2.88s 0s infinite both;
  -o-animation: cssload-spin 2.88s 0s infinite both;
  -ms-animation: cssload-spin 2.88s 0s infinite both;
  -webkit-animation: cssload-spin 2.88s 0s infinite both;
  -moz-animation: cssload-spin 2.88s 0s infinite both;
}
.cssload-loading .cssload-dot2 {
  position: absolute;
  border-radius: 50%;
  width: 19px;
  height: 19px;
  background: rgb(0, 0, 0);
  animation: cssload-spin2 2.88s 0s infinite both;
  -o-animation: cssload-spin2 2.88s 0s infinite both;
  -ms-animation: cssload-spin2 2.88s 0s infinite both;
  -webkit-animation: cssload-spin2 2.88s 0s infinite both;
  -moz-animation: cssload-spin2 2.88s 0s infinite both;
}

@keyframes cssload-spin {
  0%,
  100% {
    box-shadow: 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0),
      0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0);
  }
  50% {
    transform: rotate(180deg);
  }
  25%,
  75% {
    box-shadow: 27px 0 0 rgb(0, 0, 0), -27px 0 0 rgb(0, 0, 0), 0 27px 0 rgb(0, 0, 0), 0 -27px 0 rgb(0, 0, 0),
      19px -19px 0 rgb(0, 0, 0), 19px 19px 0 rgb(0, 0, 0), -19px -19px 0 #000, -19px 19px 0 #000;
  }
  100% {
    transform: rotate(360deg);
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
}

@-o-keyframes cssload-spin {
  0%,
  100% {
    box-shadow: 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0),
      0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0);
  }
  50% {
    -o-transform: rotate(180deg);
  }
  25%,
  75% {
    box-shadow: 27px 0 0 rgb(0, 0, 0), -27px 0 0 rgb(0, 0, 0), 0 27px 0 rgb(0, 0, 0), 0 -27px 0 rgb(0, 0, 0),
      19px -19px 0 rgb(0, 0, 0), 19px 19px 0 rgb(0, 0, 0), -19px -19px 0 #000, -19px 19px 0 #000;
  }
  100% {
    -o-transform: rotate(360deg);
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
}

@-ms-keyframes cssload-spin {
  0%,
  100% {
    box-shadow: 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0),
      0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0);
  }
  50% {
    -ms-transform: rotate(180deg);
  }
  25%,
  75% {
    box-shadow: 27px 0 0 rgb(0, 0, 0), -27px 0 0 rgb(0, 0, 0), 0 27px 0 rgb(0, 0, 0), 0 -27px 0 rgb(0, 0, 0),
      19px -19px 0 rgb(0, 0, 0), 19px 19px 0 rgb(0, 0, 0), -19px -19px 0 #000, -19px 19px 0 #000;
  }
  100% {
    -ms-transform: rotate(360deg);
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
}

@-webkit-keyframes cssload-spin {
  0%,
  100% {
    box-shadow: 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0),
      0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  25%,
  75% {
    box-shadow: 27px 0 0 rgb(0, 0, 0), -27px 0 0 rgb(0, 0, 0), 0 27px 0 rgb(0, 0, 0), 0 -27px 0 rgb(0, 0, 0),
      19px -19px 0 rgb(0, 0, 0), 19px 19px 0 rgb(0, 0, 0), -19px -19px 0 #000, -19px 19px 0 #000;
  }
  100% {
    -webkit-transform: rotate(360deg);
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
}

@-moz-keyframes cssload-spin {
  0%,
  100% {
    box-shadow: 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0),
      0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0), 0 0 0 rgb(0, 0, 0);
  }
  50% {
    -moz-transform: rotate(180deg);
  }
  25%,
  75% {
    box-shadow: 27px 0 0 rgb(0, 0, 0), -27px 0 0 rgb(0, 0, 0), 0 27px 0 rgb(0, 0, 0), 0 -27px 0 rgb(0, 0, 0),
      19px -19px 0 rgb(0, 0, 0), 19px 19px 0 rgb(0, 0, 0), -19px -19px 0 #000, -19px 19px 0 #000;
  }
  100% {
    -moz-transform: rotate(360deg);
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
}

@keyframes cssload-spin2 {
  0%,
  100% {
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
  50% {
    transform: rotate(-180deg);
  }
  25%,
  75% {
    box-shadow: 51px 0 0 #000, -51px 0 0 #000, 0 51px 0 #000, 0 -51px 0 #000, 37px -37px 0 #000, 37px 37px 0 #000,
      -37px -37px 0 #000, -37px 37px 0 #000;
    background: transparent;
  }
  100% {
    transform: rotate(-360deg);
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
}

@-o-keyframes cssload-spin2 {
  0%,
  100% {
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
  50% {
    -o-transform: rotate(-180deg);
  }
  25%,
  75% {
    box-shadow: 51px 0 0 #000, -51px 0 0 #000, 0 51px 0 #000, 0 -51px 0 #000, 37px -37px 0 #000, 37px 37px 0 #000,
      -37px -37px 0 #000, -37px 37px 0 #000;
    background: transparent;
  }
  100% {
    -o-transform: rotate(-360deg);
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
}

@-ms-keyframes cssload-spin2 {
  0%,
  100% {
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
  50% {
    -ms-transform: rotate(-180deg);
  }
  25%,
  75% {
    box-shadow: 51px 0 0 #000, -51px 0 0 #000, 0 51px 0 #000, 0 -51px 0 #000, 37px -37px 0 #000, 37px 37px 0 #000,
      -37px -37px 0 #000, -37px 37px 0 #000;
    background: transparent;
  }
  100% {
    -ms-transform: rotate(-360deg);
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
}

@-webkit-keyframes cssload-spin2 {
  0%,
  100% {
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
  50% {
    -webkit-transform: rotate(-180deg);
  }
  25%,
  75% {
    box-shadow: 51px 0 0 #000, -51px 0 0 #000, 0 51px 0 #000, 0 -51px 0 #000, 37px -37px 0 #000, 37px 37px 0 #000,
      -37px -37px 0 #000, -37px 37px 0 #000;
    background: transparent;
  }
  100% {
    -webkit-transform: rotate(-360deg);
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
}

@-moz-keyframes cssload-spin2 {
  0%,
  100% {
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
  50% {
    -moz-transform: rotate(-180deg);
  }
  25%,
  75% {
    box-shadow: 51px 0 0 #000, -51px 0 0 #000, 0 51px 0 #000, 0 -51px 0 #000, 37px -37px 0 #000, 37px 37px 0 #000,
      -37px -37px 0 #000, -37px 37px 0 #000;
    background: transparent;
  }
  100% {
    -moz-transform: rotate(-360deg);
    box-shadow: 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000, 0 0 0 #000;
  }
}
</style>
