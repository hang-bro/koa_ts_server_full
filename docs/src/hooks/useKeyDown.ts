const useKeyDown = (callback: (args: KeyboardEvent) => any) => {
  /**
   *
   */
  onMounted(() => nextTick(() => (document.onkeydown = callback)))
  /**
   *
   */
  onUnmounted(() => (document.onkeydown = null))
}

export default useKeyDown
