import { ElButton, ElInput } from "element-plus";
export type IAdd = (num: number) => void;
export default defineComponent({
  emits: ['test'],
  setup(props, { expose, emit, }) {
    const input = ref(0)
    const count = ref(0)
    const add: IAdd = (num: number) => count.value += num
    expose({ add })

    return () => (
      <section>
        <div>
          this is C1 count:{count.value}
        </div>
        <ElButton onClick={() => { emit('test', input.value) }}>
          emit
        </ElButton>

        <ElInput v-model={input.value} />
      </section>
    )
  }
})

