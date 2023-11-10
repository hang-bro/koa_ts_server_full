import { ElButton } from "element-plus"


const Test = (props: { count: number }) => {
  console.log(`props ==>`, props);

  return (
    <div>this is Test {props.count}</div>
  )
}

export default defineComponent({
  setup() {
    const count = ref(0)
    const increment = () => ++count.value
    return () => (
      <main class="w-full h-full flex items-center justify-center text-2xl flex-col">
        <Test count={count.value} />
        <div>count:{count.value}</div>
        <ElButton onClick={increment}>+1</ElButton>
      </main>
    )
  }
})