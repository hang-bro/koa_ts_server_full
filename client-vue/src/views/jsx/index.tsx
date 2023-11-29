import { ElButton } from "element-plus"
import C1, { IAdd } from './components/1'
import Loading from '@/components/loading/index.vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    const laodingRef = ref<InstanceType<typeof Loading>>()
    const C1Ref = ref<{ add: IAdd }>()
    const increment = () => {
      ++count.value
      C1Ref.value.add(2)
    }
    const test = async () => {
      const { close, open } = laodingRef.value
      await open()
      setTimeout(close, 5000)
    }
    return () => (
      <main class="w-full h-full flex items-center justify-center text-2xl flex-col">
        <C1 ref={C1Ref} onTest={(e) => {
          return console.log(`e ==>`, e)
        }} />
        <Loading ref={laodingRef} />
        <div>jsx count:{count.value}</div>
        <ElButton onClick={increment}>add</ElButton>
        <ElButton onClick={test}>loading</ElButton>
      </main>
    )
  }
})