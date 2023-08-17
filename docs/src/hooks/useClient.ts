const useClient = () => {
  const scrollHeight = ref(document.body.scrollHeight)
  const innerHeight = ref(window.innerHeight)
  const innerWidth = ref(window.innerWidth)

  let timer: any = null
  window.onresize = function () {
    // 添加防抖
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      scrollHeight.value = document.body.scrollHeight
      innerHeight.value = window.innerHeight
      innerWidth.value = window.innerWidth
    }, 500)
  }

  return { scrollHeight, innerHeight, innerWidth }
}

export default useClient
