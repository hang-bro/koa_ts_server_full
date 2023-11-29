<template>
  <main class="w-full h-full bg-none relative bg-black/30 flex justify-center items-center">
    <span class="cssload-loader">
      <span class="cssload-loader-inner"></span>
    </span>
  </main>
</template>
<script lang="ts">
export default {
  name: 'loading8',
}
</script>
<script lang="ts" setup></script>

<style type="text/css" scoped>
.cssload-loader {
  display: block;
  margin: 0 auto;
  width: 50px;
  height: 50px;
  position: relative;
  border: 4px solid rgb(0, 0, 0);
  animation: cssload-loader 2.3s infinite ease;
  -o-animation: cssload-loader 2.3s infinite ease;
  -ms-animation: cssload-loader 2.3s infinite ease;
  -webkit-animation: cssload-loader 2.3s infinite ease;
  -moz-animation: cssload-loader 2.3s infinite ease;
}

.cssload-loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: rgb(0, 0, 0);
  animation: cssload-loader-inner 2.3s infinite ease-in;
  -o-animation: cssload-loader-inner 2.3s infinite ease-in;
  -ms-animation: cssload-loader-inner 2.3s infinite ease-in;
  -webkit-animation: cssload-loader-inner 2.3s infinite ease-in;
  -moz-animation: cssload-loader-inner 2.3s infinite ease-in;
}

@keyframes cssload-loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-o-keyframes cssload-loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-ms-keyframes cssload-loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes cssload-loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@-moz-keyframes cssload-loader {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes cssload-loader-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}

@-o-keyframes cssload-loader-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}

@-ms-keyframes cssload-loader-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}

@-webkit-keyframes cssload-loader-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}

@-moz-keyframes cssload-loader-inner {
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
}
</style>
